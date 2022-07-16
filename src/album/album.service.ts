import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, AlbumReq } from '../interfaces/interfaces';

@Injectable()
export class AlbumService {
  public albums = [];
  public async getAlbums(): Promise<Album[]> {
    return this.albums;
  }

  public async getAlbumById(id: string): Promise<Album> {
    this.isValidId(id);
    const idxAlbum = this.isAlbumAvailable(id);
    return this.albums[idxAlbum];
  }

  public async createAlbum(createAlbumDto: AlbumReq): Promise<Album> {
    const createdAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(createdAlbum);
    return createdAlbum;
  }

  public async updateAlbum(
    updateAlbumDto: AlbumReq,
    id: string,
  ): Promise<Album> {
    this.isValidId(id);
    const idxAlbum = this.isAlbumAvailable(id);
    const updatedAlbum: Album = {
      ...this.albums[idxAlbum],
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    };
    this.albums.push(updatedAlbum);
    return updatedAlbum;
  }

  public async deleteAlbum(id: string): Promise<void> {
    this.isValidId(id);
    const idxAlbum = this.isAlbumAvailable(id);
    this.albums.splice(idxAlbum, 1);
  }

  private isAlbumAvailable(id: string): number {
    this.isValidId(id);
    const idxAlbum = this.albums.findIndex((user) => user.id === id);
    if (idxAlbum === -1) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return idxAlbum;
  }

  private isValidId(id: string): void {
    if (!validate(id)) {
      throw new HttpException('ID Album не валидный', HttpStatus.BAD_REQUEST);
    }
  }
}
