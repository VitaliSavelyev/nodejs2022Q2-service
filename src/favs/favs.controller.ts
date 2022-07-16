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
import { FavsService } from './favs.service';
import { FavoritesResponse } from '../interfaces/interfaces';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getFavs(): Promise<FavoritesResponse> {
    return await this.favsService.getFavs();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsTrack(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.addFavsTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsAlbum(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.addFavsAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsArtist(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.addFavsArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsTrack(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.deleteFavsElem(id, 'track');
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsAlbum(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.deleteFavsElem(id, 'album');
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsArtist(@Param('id') id: string): Promise<FavoritesResponse> {
    return await this.favsService.deleteFavsElem(id, 'artist');
  }
}
