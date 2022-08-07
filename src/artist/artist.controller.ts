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
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from '../interfaces/interfaces';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('artist')
@UseGuards(AuthGuard('jwt'))
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getArtists(): Promise<Artist[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return await this.artistService.getArtistById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Body() updatedArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Artist> {
    return await this.artistService.updateArtist(updatedArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.artistService.deleteArtist(id);
  }
}
