import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsModule } from '../favs/favs.module';

@Module({
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
  imports: [forwardRef(() => FavsModule)],
})
export class TrackModule {}
