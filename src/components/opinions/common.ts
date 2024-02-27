export interface Opinion {
  name: string;
  profesion: string;
  description: string;
  postDate: string;
  subcomments?: Opinion[];
  rating?: number;
}
