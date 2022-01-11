import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable, runInAction } from 'mobx';
import { create, persist, IHydrateResult } from 'mobx-persist';
import { wsRoutes } from 'constants/web-socket';

import { IRootStore } from '.';

export const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});
class UserStore {
  private _rootStore: IRootStore;
  // TODO: Storing Sensitive Info
  @persist userToken: string | null = null;

  @persist login: string | null = null;

  persistedUser: IHydrateResult<UserStore> | null = null;
  isUserHydrated: boolean = false;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    this.persistedUser = hydrate('user', this);
    this.persistedUser.then(() => {
      console.log('USER store hydrate');
      runInAction(() => {
        this.isUserHydrated = true;
      });
    });

    console.log('USER store constructor');

    makeAutoObservable(this);
  }

  get isUserAuth() {
    return !!this.userToken;
  }

  async setToken(token: string) {
    try {
      await this._rootStore.webSocketStore.call<undefined>({
        method: wsRoutes.SET_TOKEN_CALL,
        payload: {
          token,
        },
      });
      return { success: true };
    } catch (e) {
      console.log(`@SetToken - Error in request ${e}`);
      // optionally
      // this.singOut();
    }
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this._rootStore.webSocketStore.call<{ token: string }>({
        method: wsRoutes.SING_IN_CALL,
        payload: {
          login: email,
          password: password,
        },
      });
      if (result?.token) {
        runInAction(() => {
          this.userToken = result.token;
          this.login = email;
        });
        this.setToken(result.token);
        return { result: result.token };
      }
      return new Error('No token');
    } catch (e) {
      throw e;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this._rootStore.webSocketStore.call<{ token: string }>({
        method: wsRoutes.SING_UP_CALL,
        payload: {
          login: email,
          password: password,
        },
      });
      if (result?.token) {
        runInAction(() => {
          this.userToken = result.token;
          this.login = email;
        });
        this.setToken(result.token);
        return { result: result.token };
      }
      return new Error('No token');
    } catch (e) {
      throw e;
    }
  }

  signOut() {
    this.persistedUser?.rehydrate().then(() => {
      runInAction(() => {
        this.userToken = null;
        this.login = null;
      });
    });
  }
}

export default UserStore;
