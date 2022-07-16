import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { ArtistService } from '../artist/artist.service';
import { FavsService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Module({
  providers: [ArtistService, FavsService, AlbumService, TrackService],
  controllers: [AlbumController],
})
export class AlbumModule {}
