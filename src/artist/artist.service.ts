import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist, ArtistReq } from '../interfaces/interfaces';

@Injectable()
export class ArtistService {
  public artists = [];
  public async getArtists(): Promise<Artist[]> {
    return this.artists;
  }

  public async getArtistById(id: string): Promise<Artist> {
    this.isValidId(id);
    const idxArtist = this.isArtistAvailable(id);
    return this.artists[idxArtist];
  }

  public async createArtist(createArtistDto: ArtistReq): Promise<Artist> {
    const createdArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(createdArtist);
    return createdArtist;
  }

  public async updateArtist(
    updateArtistDto: ArtistReq,
    id: string,
  ): Promise<Artist> {
    this.isValidId(id);
    const idxArtist = this.isArtistAvailable(id);
    const updatedArtist: Artist = {
      ...this.artists[idxArtist],
      name: updateArtistDto,
      grammy: this.artists[idxArtist].grammy,
    };
    this.artists.push(updatedArtist);
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    this.isValidId(id);
    const idxArtist = this.isArtistAvailable(id);
    this.artists.splice(idxArtist, 1);
  }

  private isArtistAvailable(id: string): number {
    this.isValidId(id);
    const idxArtist = this.artists.findIndex((user) => user.id === id);
    if (idxArtist === -1) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return idxArtist;
  }

  private isValidId(id: string): void {
    if (!validate(id)) {
      throw new HttpException('ID artist не валидный', HttpStatus.BAD_REQUEST);
    }
  }
}
