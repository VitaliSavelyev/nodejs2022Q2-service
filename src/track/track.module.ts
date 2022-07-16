import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { ArtistService } from '../artist/artist.service';
import { FavsService } from '../favs/favs.service';
import { AlbumService } from '../album/album.service';

@Module({
  providers: [TrackService, ArtistService, FavsService, AlbumService],
  controllers: [TrackController],
})
export class TrackModule {}
