import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Artist, ArtistReq } from '../interfaces/interfaces';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';

const artists = [
  // {
  //   id: '322dfd9c-fb0f-47c8-81a1-4b1fb3826eb3',
  //   name: 'Vitali',
  //   grammy: true,
  // },
  // {
  //   id: '159f6531-1e3b-4753-a2ec-d736e00dbf08',
  //   name: 'Kate',
  //   grammy: true,
  // },
];

@Injectable()
export class ArtistService {
  constructor(
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  public async getArtists(): Promise<Artist[]> {
    return artists;
  }

  public async getArtistById(id: string): Promise<Artist> {
    const idxArtist = this.isArtistAvailable(id);
    return artists[idxArtist];
  }

  public async createArtist(createArtistDto: ArtistReq): Promise<Artist> {
    const createdArtist: Artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    artists.push(createdArtist);
    return createdArtist;
  }

  public async updateArtist(
    updateArtistDto: ArtistReq,
    id: string,
  ): Promise<Artist> {
    const idxArtist = this.isArtistAvailable(id);
    const updatedArtist: Artist = {
      ...artists[idxArtist],
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };
    artists[idxArtist] = updatedArtist;
    return updatedArtist;
  }

  public async deleteArtist(id: string): Promise<void> {
    const idxArtist = this.isArtistAvailable(id);
    artists.splice(idxArtist, 1);
    this.albumService.setArtistAfterDelete(id);
    this.trackService.setArtistAfterDelete(id);
    this.favsService.removedFavsAfterDeleteElem(id, 'artists');
  }

  public checkArtist(id): Artist | null {
    const artist: Artist = artists.find((user) => user.id === id);
    return artist;
  }

  private isArtistAvailable(id: string): number {
    const idxArtist = artists.findIndex((user) => user.id === id);
    if (idxArtist === -1) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return idxArtist;
  }
}
