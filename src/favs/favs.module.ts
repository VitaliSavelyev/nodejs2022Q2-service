import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Module({
  providers: [FavsService, ArtistService, AlbumService, TrackService],
  controllers: [FavsController],
})
export class FavsModule {}
