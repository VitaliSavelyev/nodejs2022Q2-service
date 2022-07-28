import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Album,
  Artist,
  Favorites,
  FavoritesResponse,
  Track,
} from '../interfaces/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { FavsEntity } from './entity/favs.entity';
import { Repository } from 'typeorm';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsEntity)
    private readonly favsRepository: Repository<FavsEntity>,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {
    this.createFavs().then(() => console.log(1));
  }

  public async createFavs(): Promise<void> {
    const favs = {
      tracksIds: [],
      albumsIds: [],
      artistsIds: [],
    };
    const createdFavs = await this.favsRepository.create(favs);
    await this.favsRepository.save(createdFavs);
  }

  public async getFavs(): Promise<FavoritesResponse> {
    const favs = await this.favsRepository.find();
    return this.setFavsResponse(favs[0]);
  }

  public async addFavsTrack(id: string): Promise<Track> {
    const track = await this.trackService.getTrackById(id, true);
    if (track) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.tracksIds.push(id);
        await this.favsRepository.save(updatedFavs);
        return track;
      }
    } else {
      throw new HttpException(
        'Трек не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  public async addFavsArtist(id: string): Promise<Artist> {
    const artist = await this.artistService.getArtistById(id, true);
    if (artist) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.artistsIds.push(id);
        await this.favsRepository.save(updatedFavs);
        return artist;
      }
    } else {
      throw new HttpException(
        'Артист не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  public async addFavsAlbum(id: string): Promise<Album> {
    const album = await this.albumService.getAlbumById(id, true);
    if (album) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.albumsIds.push(id);
        await this.favsRepository.save(updatedFavs);
        return album;
      }
    } else {
      throw new HttpException(
        'Альбом не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  public async deleteFavsAlbum(id: string): Promise<void> {
    const album = await this.albumService.getAlbumById(id);
    if (album) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.albumsIds = updatedFavs.albumsIds.filter(
          (elem) => elem !== album.id,
        );
        await this.favsRepository.save(updatedFavs);
      } else {
        throw new HttpException(
          'Альбом не найден',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }
  }

  public async deleteFavsTrack(id: string): Promise<void> {
    const track = await this.trackService.getTrackById(id);
    if (track) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.tracksIds = updatedFavs.tracksIds.filter(
          (elem) => elem !== track.id,
        );
        await this.favsRepository.save(updatedFavs);
      }
    } else {
      throw new HttpException(
        'Трек не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  public async deleteFavsArtist(id: string): Promise<void> {
    const artist = await this.artistService.getArtistById(id);
    if (artist) {
      const favs = await this.favsRepository.find();
      if (favs[0]) {
        const updatedFavs = favs[0];
        updatedFavs.artistsIds = updatedFavs.artistsIds.filter(
          (elem) => elem !== artist.id,
        );
        await this.favsRepository.save(updatedFavs);
      }
    } else {
      throw new HttpException(
        'Артист не найден',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // public removedFavsAfterDeleteElem(id: string, type: string): void {
  //   if (type === 'artists') {
  //     favs.artists = favs.artists.filter((elem) => elem !== id);
  //   }
  //   if (type === 'albums') {
  //     favs.albums = favs.albums.filter((elem) => elem !== id);
  //   }
  //   if (type === 'tracks') {
  //     favs.tracks = favs.tracks.filter((elem) => elem !== id);
  //   }
  // }

  private async setFavsResponse(fav: FavsEntity): Promise<FavoritesResponse> {
    const artists: Artist[] = await this.setFavsArtists(fav.artistsIds);
    const tracks: Track[] = await this.setFavsTracks(fav.tracksIds);
    const albums: Album[] = await this.setFavsAlbums(fav.albumsIds);
    return { artists, tracks, albums };
  }

  private async setFavsArtists(artistsId: string[]): Promise<Artist[]> {
    if (!artistsId.length) {
      return [];
    }
    const promises = artistsId.map((elem) => {
      return this.artistService.getArtistById(elem);
    });
    const artists: Artist[] = await Promise.all(promises);
    return artists;
  }

  private async setFavsTracks(tracksIds: string[]): Promise<Track[]> {
    if (!tracksIds.length) {
      return [];
    }
    const promises = tracksIds.map((elem) => {
      return this.trackService.getTrackById(elem);
    });
    const tracks: Track[] = await Promise.all(promises);
    return tracks;
  }

  private async setFavsAlbums(albumsIds: string[]): Promise<Album[]> {
    if (!albumsIds.length) {
      return [];
    }
    const promises = albumsIds.map((elem) => {
      return this.albumService.getAlbumById(elem);
    });
    const albums: Album[] = await Promise.all(promises);
    return albums;
  }
}
