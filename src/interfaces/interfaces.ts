export interface UserReq {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface User extends UserReq {
  password: string;
}

export interface ArtistReq {
  name: string;
  grammy: boolean;
}

export interface Artist extends ArtistReq {
  id: string; // uuid v4
}

export interface TrackReq {
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface Track extends TrackReq {
  id: string; // uuid v4
}

export interface AlbumReq {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Album extends AlbumReq {
  id: string; // uuid v4
}

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface CreateUserInt {
  login: string;
  password: string;
}

export interface UpdatePasswordInt {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
