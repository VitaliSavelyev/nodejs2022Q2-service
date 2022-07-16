import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
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

@Injectable()
export class FavsService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}
  public favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  public async getFavs(): Promise<FavoritesResponse> {
    return this.setFavsResponse();
  }

  public async addFavsTrack(id: string): Promise<FavoritesResponse> {
    this.isValidId(id, 'track');
    this.favs.tracks.push(id);
    return this.setFavsResponse();
  }

  public async addFavsArtist(id: string): Promise<FavoritesResponse> {
    this.isValidId(id, 'artist');
    this.favs.artists.push(id);
    return this.setFavsResponse();
  }

  public async addFavsAlbum(id: string): Promise<FavoritesResponse> {
    this.isValidId(id, 'album');
    this.favs.albums.push(id);
    return this.setFavsResponse();
  }

  public async deleteFavsElem(
    id: string,
    type: string,
  ): Promise<FavoritesResponse> {
    this.isValidId(id, type);
    this.favs[`${type}`] = this.favs[`${type}`].filter(
      (elem: string) => id !== elem,
    );
    return this.setFavsResponse();
  }

  private isValidId(id: string, type: string): void {
    if (!validate(id)) {
      throw new HttpException(`ID ${type} не валидный`, HttpStatus.BAD_REQUEST);
    }
  }

  private async setFavsResponse(): Promise<FavoritesResponse> {
    const artists: Artist[] = await this.setFavsArtists();
    const tracks: Track[] = await this.setFavsTracks();
    const albums: Album[] = await this.setFavsAlbums();
    return { artists, tracks, albums };
  }

  private async setFavsArtists(): Promise<Artist[]> {
    const promises = this.favs.artists.map((elem) => {
      return this.artistService.getArtistById(elem);
    });
    const artists: Artist[] = await Promise.all(promises);
    return artists;
  }

  private async setFavsTracks(): Promise<Track[]> {
    const promises = this.favs.tracks.map((elem) => {
      return this.trackService.getTrackById(elem);
    });
    const tracks: Track[] = await Promise.all(promises);
    return tracks;
  }

  private async setFavsAlbums(): Promise<Album[]> {
    const promises = this.favs.albums.map((elem) => {
      return this.albumService.getAlbumById(elem);
    });
    const albums: Album[] = await Promise.all(promises);
    return albums;
  }
}
