interface ITrack {
  name: string;
  artists: string;
}

export interface ITrackDictionary {
  [id: string]: ITrack;
}
