import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track, TrackReq } from '../interfaces/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  public async getTracks(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  public async getTrackById(id: string, favs = false): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) {
      return track;
    } else {
      if (!favs) {
        throw new HttpException('Песня не найден', HttpStatus.NOT_FOUND);
      }
    }
  }

  public async createTrack(createTrackDto: TrackReq): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    const createdTrack = await this.trackRepository.create(newTrack);
    return (await this.trackRepository.save(createdTrack)).toResponse();
  }

  public async updateTrack(
    updateTrackDto: TrackReq,
    id: string,
  ): Promise<Track> {
    const updatedTrack = await this.trackRepository.findOne({
      where: { id },
    });
    if (updatedTrack) {
      updatedTrack.name = updateTrackDto.name;
      updatedTrack.duration = updateTrackDto.duration;
      updatedTrack.artistId = updateTrackDto.artistId;
      updatedTrack.albumId = updateTrackDto.albumId;
      return (await this.trackRepository.save(updatedTrack)).toResponse();
    } else {
      throw new HttpException('Песня не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async deleteTrack(id: string): Promise<void> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Песня не найден', HttpStatus.NOT_FOUND);
    }
    // this.favsServise.removedFavsAfterDeleteElem(id, 'tracks');
  }
}
