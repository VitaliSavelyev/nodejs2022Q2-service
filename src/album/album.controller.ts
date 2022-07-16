import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from '../interfaces/interfaces';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAlbums(): Promise<Album[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAlbum(@Param('id') id: string): Promise<Album> {
    return await this.albumService.getAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Body() updatedAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ): Promise<Album> {
    return await this.albumService.updateAlbum(updatedAlbumDto, id);
  }

  @Delete('id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id') id: string): Promise<void> {
    return await this.albumService.deleteAlbum(id);
  }
}
