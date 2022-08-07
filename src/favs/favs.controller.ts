import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import {
  Album,
  Artist,
  FavoritesResponse,
  Track,
} from '../interfaces/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('favs')
@UseGuards(AuthGuard('jwt'))
export class FavsController {
  constructor(private readonly favsService: FavsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getFavs(): Promise<FavoritesResponse> {
    return await this.favsService.getFavs();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    return await this.favsService.addFavsTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Album> {
    return await this.favsService.addFavsAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addFavsArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return await this.favsService.addFavsArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favsService.deleteFavsTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favsService.deleteFavsAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFavsArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.favsService.deleteFavsArtist(id);
  }
}
