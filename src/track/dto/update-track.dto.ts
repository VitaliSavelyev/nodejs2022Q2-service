import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  readonly name: string;
  @IsUUID(4)
  @IsOptional()
  readonly artistId: string | null;
  @IsUUID(4)
  @IsOptional()
  readonly albumId: string | null;
  @IsNumber()
  readonly duration: number;
}
