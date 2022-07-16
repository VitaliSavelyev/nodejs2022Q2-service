import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './track/track.controller';
import { AlbumController } from './album/album.controller';
import { FavsController } from './favs/favs.controller';
import { AlbumService } from './album/album.service';
import { FavsService } from './favs/favs.service';
import { TrackService } from './track/track.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [
    AppController,
    TrackController,
    AlbumController,
    FavsController,
  ],
  providers: [AppService, AlbumService, FavsService, TrackService],
})
export class AppModule {}
