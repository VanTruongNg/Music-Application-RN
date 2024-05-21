import { TrackDataFields, TrackDataItemFields } from 'src/models/Track';

export interface ReadDataProps {
  collection?: 'TrackList' | 'RapidApi';
  doc?: string;
}

export interface WriteDataProps extends ReadDataProps {
  data: TrackDataFields;
}

export interface TrackInfoFields {
  id: string;
  url: string;
  title: string;
  artist: string;
}

export interface UploadFileFields {
  localFilePath: string;
  data: TrackDataItemFields;
}

export interface AddPlayListFields {
  playListId?: string;
  data: {
    name: string;
    img: string;
  };
}

export interface AddTrackToPlayListFields {
  data: TrackDataFields;
  ref?: string;
  callback?: () => void;
}
