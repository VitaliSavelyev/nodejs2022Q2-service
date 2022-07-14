import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { FavsController } from './favs/favs.controller';
import { AlbumService } from './album/album.service';
import { ArtistService } from './artist/artist.service';
import { FavsService } from './favs/favs.service';
import { TrackService } from './track/track.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [
    AppController,
    TrackController,
    ArtistController,
    AlbumController,
    FavsController,
  ],
  providers: [
    AppService,
    AlbumService,
    ArtistService,
    FavsService,
    TrackService,
  ],
})
export class AppModule {}
