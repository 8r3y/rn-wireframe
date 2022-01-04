import WebSocketStore from './WebSocketStore';
import UserStore from './UserStore';
import NetInfoStore from './NetInfoStore';
export interface IRootStore {
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;
}

class RootStore implements IRootStore {
  webSocketStore: WebSocketStore;
  userStore: UserStore;
  netInfoStore: NetInfoStore;

  constructor() {
    this.webSocketStore = new WebSocketStore(this);
    this.userStore = new UserStore(this);
    this.netInfoStore = new NetInfoStore(this);
  }
}

const store = new RootStore();

export default store;
