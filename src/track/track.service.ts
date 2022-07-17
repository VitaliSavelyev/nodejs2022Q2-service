import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Album, Track, TrackReq } from '../interfaces/interfaces';
import { FavsService } from '../favs/favs.service';

const tracks = [
  {
    id: 'caf3e31c-ed44-495e-864d-9337c084e0a9',
    name: 'track1',
    artistId: '322dfd9c-fb0f-47c8-81a1-4b1fb3826eb3',
    albumId: '965a56d5-eff5-4cb2-a9eb-fea6fb444b3e',
    duration: 500,
  },
];

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsServise: FavsService,
  ) {}

  public async getTracks(): Promise<Track[]> {
    return tracks;
  }

  public async getTrackById(id: string): Promise<Track> {
    const idxTrack = this.isTrackAvailable(id);
    return tracks[idxTrack];
  }

  public async createTrack(createTrackDto: TrackReq): Promise<Track> {
    const createdTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    tracks.push(createdTrack);
    return createdTrack;
  }

  public async updateTrack(
    updateTrackDto: TrackReq,
    id: string,
  ): Promise<Track> {
    const idxTrack = this.isTrackAvailable(id);
    const updatedTrack: Track = {
      ...tracks[idxTrack],
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };
    tracks[idxTrack] = updatedTrack;
    return updatedTrack;
  }

  public async deleteTrack(id: string): Promise<void> {
    const idxTrack = this.isTrackAvailable(id);
    tracks.splice(idxTrack, 1);
    this.favsServise.removedFavsAfterDeleteElem(id, 'tracks');
  }

  public setArtistAfterDelete(id: string) {
    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }

  public setAlbumAfterDelete(id: string): void {
    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
  }

  public checkTrack(id): Track | null {
    const track: Track = tracks.find((album) => album.id === id);
    return track;
  }

  private isTrackAvailable(id: string): number {
    const idxTrack = tracks.findIndex((user) => user.id === id);
    if (idxTrack === -1) {
      throw new HttpException('Песня не найден', HttpStatus.NOT_FOUND);
    }
    return idxTrack;
  }
}
