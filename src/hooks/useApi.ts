import store from 'store';
import { Alert } from 'react-native';

export const useApi = () => {
  const isServerConnected = store.apiStore.isServerConnected;
  const isNetworkConnected = store.netInfoStore.isNetworkConnected;
  const isServerError = store.apiStore.isServerError;

  const init = () => {
    if (isNetworkConnected) {
      store.apiStore.init();
    } else {
      Alert.alert('Ошибка', 'Отсутствует подключение к сети');
    }
  };

  return {
    isServerConnected,
    isNetworkConnected,
    isServerError,
    init,
  };
};
