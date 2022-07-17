import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { FavsModule } from '../favs/favs.module';
import { FavsService } from '../favs/favs.service';
import { AlbumModule } from '../album/album.module';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [ArtistController],
  imports: [forwardRef(() => FavsModule), forwardRef(() => AlbumModule)],
  providers: [ArtistService, AlbumService, TrackService, FavsService],
  exports: [ArtistService],
})
export class ArtistModule {}
