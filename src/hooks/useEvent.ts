import { useState } from 'react';
import { Alert } from 'react-native';
import RNFS, { DownloadProgressCallbackResult } from 'react-native-fs';
import store from 'store';
import { IEvent } from 'models';
import { IDownloadedEvent } from 'models';

const rootPath = 'file://' + RNFS.DocumentDirectoryPath + '/';

export const useEvent = () => {
  const events =
    store.eventStore.events.length > 0 ? store.eventStore.events : [];
  const downloadedEvents =
    store.eventStore.downloadedEvents.length > 0
      ? store.eventStore.downloadedEvents
      : [];
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isFetch, setIsFetch] = useState(false);

  const getEvents = () => {
    try {
      store.eventStore.getEvents();
    } catch {}
  };

  const _saveDownloadedEvent = (event: IDownloadedEvent) => {
    store.eventStore.saveDownloadedEvent(event);
  };

  const downloadEvent = (event: IEvent) => {
    const re: any = /(?:\.([^.]+))?$/;
    const ext = re.exec(event?.signTranslation)[1];
    const path = rootPath + 'event-video-' + event?.id + '.' + ext;
    let downloadOptions = {
      fromUrl: event?.signTranslation ?? '',
      toFile: path,
      begin: () => setIsFetch(true),
      progress: ({
        bytesWritten,
        contentLength,
      }: DownloadProgressCallbackResult) => {
        const progress = Math.floor((bytesWritten / contentLength) * 100);
        setDownloadProgress(progress);
      },
    };
    RNFS.downloadFile(downloadOptions)
      .promise.then(() => {
        _saveDownloadedEvent({
          ...event,
          filePath: path,
        });
      })
      .catch((e) => {
        Alert.alert('Ошибка', 'Не удалось загрузить файл');
        console.log('@Download file: ', e);
      })
      .finally(() => {
        setIsFetch(false);
      });
  };

  return {
    events,
    getEvents,
    downloadedEvents,
    downloadEvent,
    isFetch,
    downloadProgress,
  };
};
