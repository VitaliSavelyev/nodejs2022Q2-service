import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsUUID(4)
  @IsOptional()
  readonly artistId: string | null;
  @IsNotEmpty()
  @IsUUID(4)
  @IsOptional()
  readonly albumId: string | null;
  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;
}
