export interface IEvent {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
  picture: string;
  libretto: string;
  signTranslation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDownloadedEvent extends IEvent {
  filePath: string;
}
