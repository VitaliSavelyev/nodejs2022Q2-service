import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Album,
  Artist,
  Favorites,
  FavoritesResponse,
  Track,
} from '../interfaces/interfaces';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';

const favs: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavsService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  public async getFavs(): Promise<FavoritesResponse> {
    return this.setFavsResponse();
  }

  public async addFavsTrack(id: string): Promise<Track> {
    const isElem = this.trackService.checkTrack(id);
    if (isElem) {
      favs.tracks.push(id);
    } else {
      throw new HttpException(
        'Трек не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return isElem;
  }

  public async addFavsArtist(id: string): Promise<Artist> {
    const isElem = this.artistService.checkArtist(id);
    if (isElem) {
      favs.artists.push(id);
    } else {
      throw new HttpException(
        'Артист не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return isElem;
  }

  public async addFavsAlbum(id: string): Promise<Album> {
    const isElem = this.albumService.checkAlbum(id);
    if (isElem) {
      favs.albums.push(id);
    } else {
      throw new HttpException(
        'Альбом не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return isElem;
  }

  public async deleteFavsAlbum(id: string): Promise<void> {
    const isElem = this.albumService.checkAlbum(id);
    if (isElem) {
      favs.albums = favs.albums.filter((elem) => elem !== id);
    }
  }

  public async deleteFavsTrack(id: string): Promise<void> {
    const isElem = this.trackService.checkTrack(id);
    if (isElem) {
      favs.tracks = favs.tracks.filter((elem) => elem !== id);
    }
  }

  public async deleteFavsArtist(id: string): Promise<void> {
    const isElem = this.artistService.checkArtist(id);
    if (isElem) {
      favs.artists = favs.artists.filter((elem) => elem !== id);
    }
  }

  public removedFavsAfterDeleteElem(id: string, type: string): void {
    if (type === 'artists') {
      favs.artists = favs.artists.filter((elem) => elem !== id);
    }
    if (type === 'albums') {
      favs.albums = favs.albums.filter((elem) => elem !== id);
    }
    if (type === 'tracks') {
      favs.tracks = favs.tracks.filter((elem) => elem !== id);
    }
  }

  private async setFavsResponse(): Promise<FavoritesResponse> {
    const artists: Artist[] = await this.setFavsArtists();
    const tracks: Track[] = await this.setFavsTracks();
    const albums: Album[] = await this.setFavsAlbums();
    return { artists, tracks, albums };
  }

  private async setFavsArtists(): Promise<Artist[]> {
    if (!favs.artists.length) {
      return [];
    }
    const promises = favs.artists.map((elem) => {
      return this.artistService.checkArtist(elem);
    });
    const artists: Artist[] = await Promise.all(promises);
    return artists;
  }

  private async setFavsTracks(): Promise<Track[]> {
    if (!favs.tracks.length) {
      return [];
    }
    const promises = favs.tracks.map((elem) => {
      return this.trackService.checkTrack(elem);
    });
    const tracks: Track[] = await Promise.all(promises);
    return tracks;
  }

  private async setFavsAlbums(): Promise<Album[]> {
    if (!favs.albums.length) {
      return [];
    }
    const promises = favs.albums.map((elem) => {
      return this.albumService.checkAlbum(elem);
    });
    const albums: Album[] = await Promise.all(promises);
    return albums;
  }
}
