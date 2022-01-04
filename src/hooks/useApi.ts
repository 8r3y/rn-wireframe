import store from 'store';
import { Alert } from 'react-native';

export const useApi = () => {
  const isServerConnected = store.webSocketStore.isServerConnected;
  const isNetworkConnected = store.netInfoStore.isNetworkConnected;
  const isServerError = store.webSocketStore.isServerError;

  const init = () => {
    if (isNetworkConnected) {
      store.webSocketStore.init();
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
