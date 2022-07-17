import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, AlbumReq, Artist } from '../interfaces/interfaces';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

const albums = [];

@Injectable()
export class AlbumService {
  constructor(
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsServise: FavsService,
  ) {}
  public async getAlbums(): Promise<Album[]> {
    return albums;
  }

  public async getAlbumById(id: string): Promise<Album> {
    const idxAlbum = this.isAlbumAvailable(id);
    return albums[idxAlbum];
  }

  public async createAlbum(createAlbumDto: AlbumReq): Promise<Album> {
    const createdAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    albums.push(createdAlbum);
    return createdAlbum;
  }

  public async updateAlbum(
    updateAlbumDto: AlbumReq,
    id: string,
  ): Promise<Album> {
    const idxAlbum = this.isAlbumAvailable(id);
    const updatedAlbum: Album = {
      ...albums[idxAlbum],
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };
    albums[idxAlbum] = updatedAlbum;
    return updatedAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    const idxAlbum = this.isAlbumAvailable(id);
    albums.splice(idxAlbum, 1);
    this.trackService.setAlbumAfterDelete(id);
    this.favsServise.removedFavsAfterDeleteElem(id, 'albums');
  }

  public checkAlbum(id): Album | null {
    const album: Album = albums.find((album) => album.id === id);
    return album;
  }

  public setArtistAfterDelete(id: string) {
    albums.forEach((album) => {
      return album.artistId === id ? null : album.artistId;
    });
  }

  private isAlbumAvailable(id: string): number {
    const idxAlbum = albums.findIndex((album) => album.id === id);
    if (idxAlbum === -1) {
      throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
    }
    return idxAlbum;
  }
}
