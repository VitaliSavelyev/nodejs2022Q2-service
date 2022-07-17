import { IsNotEmpty } from 'class-validator';

export class UpdatedUserDto {
  @IsNotEmpty()
  readonly oldPassword: string;
  @IsNotEmpty()
  readonly newPassword: string;
}
