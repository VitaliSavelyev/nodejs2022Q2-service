import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Album, AlbumReq } from '../interfaces/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entity/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}
  public async getAlbums(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  public async getAlbumById(id: string, favs = false): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      return album;
    } else {
      if (!favs) {
        throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
      }
    }
  }

  public async createAlbum(createAlbumDto: AlbumReq): Promise<Album> {
    const newAlbum: Album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    const createdAlbum = await this.albumRepository.create(newAlbum);
    return (await this.albumRepository.save(createdAlbum)).toResponse();
  }

  public async updateAlbum(
    updateAlbumDto: AlbumReq,
    id: string,
  ): Promise<Album> {
    const updatedAlbum = await this.albumRepository.findOne({
      where: { id },
    });
    if (updatedAlbum) {
      updatedAlbum.name = updateAlbumDto.name;
      updatedAlbum.year = updateAlbumDto.year;
      updatedAlbum.artistId = updateAlbumDto.artistId;
      return (await this.albumRepository.save(updatedAlbum)).toResponse();
    } else {
      throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async deleteAlbum(id: string): Promise<void> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Альбом не найден', HttpStatus.NOT_FOUND);
    }
    // this.trackService.setAlbumAfterDelete(id);
    // this.favsServise.removedFavsAfterDeleteElem(id, 'albums');
  }

  public checkAlbum(id): Album | null {
    const album: Album = [].find((album) => album.id === id);
    return album;
  }
}
