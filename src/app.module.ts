import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule, FavsModule],
  controllers: [AppController, FavsController],
  providers: [AppService, FavsService],
})
export class AppModule {}
