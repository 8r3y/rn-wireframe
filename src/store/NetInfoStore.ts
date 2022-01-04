import { makeAutoObservable, runInAction } from 'mobx';
import NetInfo from '@react-native-community/netinfo';

import { IRootStore } from '.';

class NetInfoStore {
  private _rootStore: IRootStore;
  isNetworkConnected: boolean | null = true;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    NetInfo.addEventListener((state) => {
      runInAction(() => {
        this.isNetworkConnected = state.isConnected;
      });
    });

    makeAutoObservable(this);
  }
}

export default NetInfoStore;
