import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';

@Module({
  controllers: [ArtistController],
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
