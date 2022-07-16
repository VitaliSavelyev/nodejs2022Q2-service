import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4, validate } from 'uuid';
import { Track, TrackReq } from '../interfaces/interfaces';

@Injectable()
export class TrackService {
  public tracks = [];
  public async getTracks(): Promise<Track[]> {
    return this.tracks;
  }

  public async getTrackById(id: string): Promise<Track> {
    this.isValidId(id);
    const idxTrack = this.isTrackAvailable(id);
    return this.tracks[idxTrack];
  }

  public async createTrack(createTrackDto: TrackReq): Promise<Track> {
    const createdTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    this.tracks.push(createdTrack);
    return createdTrack;
  }

  public async updateTrack(
    updateTrackDto: TrackReq,
    id: string,
  ): Promise<Track> {
    this.isValidId(id);
    const idxTrack = this.isTrackAvailable(id);
    const updatedTrack: Track = {
      ...this.tracks[idxTrack],
      name: updateTrackDto.name,
      artistId: updateTrackDto.artistId,
      albumId: updateTrackDto.albumId,
      duration: updateTrackDto.duration,
    };
    this.tracks.push(updatedTrack);
    return updatedTrack;
  }

  public async deleteTrack(id: string): Promise<void> {
    this.isValidId(id);
    const idxTrack = this.isTrackAvailable(id);
    this.tracks.splice(idxTrack, 1);
  }

  private isTrackAvailable(id: string): number {
    this.isValidId(id);
    const idxTrack = this.tracks.findIndex((user) => user.id === id);
    if (idxTrack === -1) {
      throw new HttpException('Песня не найден', HttpStatus.NOT_FOUND);
    }
    return idxTrack;
  }

  private isValidId(id: string): void {
    if (!validate(id)) {
      throw new HttpException('ID Track не валидный', HttpStatus.BAD_REQUEST);
    }
  }
}
