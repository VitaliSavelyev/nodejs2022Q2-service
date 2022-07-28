import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsEntity } from './entity/favs.entity';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  exports: [FavsService],
  imports: [
    TypeOrmModule.forFeature([FavsEntity]),
    ArtistModule,
    AlbumModule,
    TrackModule,
  ],
})
export class FavsModule {}
