import { makeAutoObservable, runInAction } from 'mobx';
import { generateUuid } from 'helpers/utils';
import { wsRoutes } from 'constants/web-socket';

import { IRootStore } from '.';

interface IBaseResponse {
  status: 0 | 1; // O - success, 1 - error
  data: any;
  method: string;
  payload?: any;
}

class WebSocketStore {
  private _rootStore: IRootStore;
  private _methodListeners: {
    uuid: string;
    timestamp: number;
    method: string;
    callback: (method: string, data: any, status: number) => void;
  }[] = [];
  private _subscribers: {
    uuid: string;
    timestamp: number;
    method: string;
    collection: string;
    cummulative: boolean;
  }[] = [];
  isServerConnected: boolean = false;
  isServerError: boolean = false;
  client: WebSocket | undefined;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);
  }

  init() {
    this.client = new WebSocket(wsRoutes.API_URL);
    console.log('API store constructor');

    this.client.onopen = () => {
      const token = this._rootStore.userStore.userToken;
      if (token) {
        this._rootStore.userStore.setToken(token);
      }
      runInAction(() => {
        this.isServerConnected = true;
        this.isServerError = false;
      });
    };

    this.client.onclose = () => {
      runInAction(() => {
        this.isServerConnected = false;
      });
    };

    this.client.onerror = () => {
      runInAction(() => {
        this.isServerError = true;
      });
      console.log('Websocket error.');
    };

    this.client.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data) as IBaseResponse;
        const { status, method, payload } = data;
        const methodListener = this._methodListeners.find(
          (x) => x.method === method,
        );

        if (methodListener) {
          methodListener.callback(method, data, status);
          const listenerIdx = this._methodListeners.findIndex(
            (x) => x.uuid === methodListener.uuid,
          );
          this._methodListeners.splice(listenerIdx, 1);
          return;
        }

        const subListeners = this._subscribers.filter(
          (x) => x.method === method,
        );
        if (Array.isArray(subListeners)) {
          // console.log("On Message subListeners", subListeners.length)
          subListeners.forEach((sub) => {
            console.log("subscription", sub);
            if (sub.collection && payload) {
              // ToDo: Реализовать внутри вебсокет стора
              // runInAction(() => {
              //   if (sub.cummulative) {
              //     const existValues =
              //       Reflect.get(this._rootStore.playerStore, sub.collection) ||
              //       [];
              //     Reflect.set(this._rootStore.playerStore, sub.collection, [
              //       ...existValues,
              //       payload,
              //     ]);
              //   } else {
              //     Reflect.set(this._rootStore.playerStore, sub.collection, [
              //       payload,
              //     ]);
              //   }
              // });
            }
          });
        }
        return;
      } catch (e) {
        console.error('Received non readable message', e, message);
      }
    };
  }

  async call<T>({
    method,
    payload,
    meta = 1,
  }: {
    method: string;
    payload: any;
    meta?: number;
  }): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client?.send(
        JSON.stringify({
          meta,
          method,
          payload,
        }),
      );

      const callback = (method: string, data: any, status: number) => {
        // console.log("Method worked", method);
        if (status === 0) {
          resolve(data?.data);
        } else {
          reject(data?.data);
        }
        return;
      };

      this._methodListeners.push({
        uuid: generateUuid(),
        timestamp: Date.now(),
        method,
        callback,
      });
    });
  }

  async subscribe<T>({
    method,
    payload,
    collection,
    subMethod,
    cummulative = false, // Свойство, определяющие, будет ли нагрузка с сервера замещающей или накопительной
  }: {
    method: string;
    payload: any;
    collection: any;
    subMethod: string;
    cummulative?: boolean;
  }): Promise<T> {
    return new Promise(async (resolve) => {
      const resultOfCall = await this.call({ method, payload })
        .then((x) => x)
        .catch(() => null);
      if (resultOfCall) {
        const uuid = generateUuid();
        this._subscribers.push({
          uuid,
          timestamp: Date.now(),
          method: subMethod,
          collection,
          cummulative,
        });
        console.log('Subscribe Id', uuid);
        resolve(resultOfCall as any);
      }

      resolve(null as any);
    });
  }
}

export default WebSocketStore;
