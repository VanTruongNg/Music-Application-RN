import { Album } from './Album';
import { TrackDataItemFields } from './Track';

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: null | any;
  total: number;
}

interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ArtistDataItemFields {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity?: number;
  type?: string;
  uri?: string;
}

export interface ArtistDataField {
  topTracks: TrackDataItemFields[];
  relatedArtist: ArtistDataItemFields[];
  relatedAlbum: {
    limit: number;
    offset: number;
    next: string;
    total: number;
    items: Album[];
  };
  artistAlbum: {
    limit: number;
    offset: number;
    next: string;
    total: number;
    items: Album[];
  };
  id: string;
}

export interface ArtistAlbumFields {
  limit: number;
  offset: number;
  next: string;
  total: number;
  items: Album[];
}

export interface ArtistState {
  artistData: ArtistDataField;
  artistAlbum: ArtistAlbumFields;
}
