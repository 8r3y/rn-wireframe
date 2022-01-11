import WebSocketStore from './WebSocketStore';
import UserStore from './UserStore';
import NetInfoStore from './NetInfoStore';
import RestApi from './RestApiStore';

export interface IRootStore {
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;
  restApi: RestApi;
}

class RootStore implements IRootStore {
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;
  restApi: RestApi;

  constructor() {
    this.webSocketStore = new WebSocketStore(this);
    this.userStore = new UserStore(this);
    this.netInfoStore = new NetInfoStore(this);
    this.restApi = new RestApi(this);
  }
}

const store = new RootStore();

export default store;
