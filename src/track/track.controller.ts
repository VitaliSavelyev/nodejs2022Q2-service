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
import { Track } from 'src/interfaces/interfaces';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('track')
@UseGuards(AuthGuard('jwt'))
export class TrackController {
  constructor(private readonly TrackService: TrackService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getTracks(): Promise<Track[]> {
    return await this.TrackService.getTracks();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getTrack(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return await this.TrackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.TrackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Body() updatedTrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Track> {
    return await this.TrackService.updateTrack(updatedTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return await this.TrackService.deleteTrack(id);
  }
}
