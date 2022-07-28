import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist, ArtistReq } from '../interfaces/interfaces';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  public async getArtists(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  public async getArtistById(id: string, favs = false): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) {
      return artist;
    } else {
      if (!favs) {
        throw new HttpException('Артист не найден', HttpStatus.NOT_FOUND);
      }
    }
  }

  public async createArtist(createArtistDto: ArtistReq): Promise<Artist> {
    const newArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    const createdArtist = await this.artistRepository.create(newArtist);
    return (await this.artistRepository.save(createdArtist)).toResponse();
  }

  public async updateArtist(
    updateArtistDto: ArtistReq,
    id: string,
  ): Promise<Artist> {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (updatedArtist) {
      updatedArtist.name = updateArtistDto.name;
      updatedArtist.grammy = updateArtistDto.grammy;
      return (await this.artistRepository.save(updatedArtist)).toResponse();
    } else {
      throw new HttpException('Артист не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async deleteArtist(id: string): Promise<void> {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Артист не найден', HttpStatus.NOT_FOUND);
    }
  }

  public checkArtist(id): Artist | null {
    const artist: Artist = [].find((user) => user.id === id);
    return artist;
  }
}
