import { useState, useEffect } from 'react';
import store from 'store';

export const usePlayer = (playId: string) => {
  const timeCodes = store.playerStore.timeCodes;
  const [timeCode, setTimeCode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const currentVideoEvent = timeCodes.find((x) => x.playId === playId);
    if (currentVideoEvent) {
      setTimeCode(currentVideoEvent.timeCode);
      setIsPlaying(currentVideoEvent.isPlaying);
    }
  }, [timeCodes, playId]);

  const join = async () => {
    try {
      const response = await store.playerStore.join(playId);
      const delayInSeconds = Math.floor(response.delay! / 1000);
      setTimeCode(response.timeCode + delayInSeconds);
      setIsPlaying(response.isPlaying);
    } catch {}
  };

  const left = () => {
    try {
      store.playerStore.left();
    } catch {}
  };

  return {
    timeCode,
    isPlaying,
    join,
    left,
  };
};
