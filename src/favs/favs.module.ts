import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Module({
  providers: [FavsService, ArtistService, TrackService, AlbumService],
  controllers: [FavsController],
  exports: [FavsService],
})
export class FavsModule {}
