import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { FavsModule } from '../favs/favs.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Module({
  providers: [AlbumService, TrackService, FavsService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [forwardRef(() => FavsModule), forwardRef(() => ArtistModule)],
})
export class AlbumModule {}
