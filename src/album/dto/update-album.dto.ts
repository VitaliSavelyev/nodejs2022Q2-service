import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly year: number;
  @IsUUID(4)
  @IsOptional()
  readonly artistId: string | null;
}
