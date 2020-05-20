import { IsString, IsDateString } from 'class-validator';
export class CreateTokenDTO {
  @IsString()
  readonly token: string;
  @IsString()
  readonly uId: string;
  @IsDateString()
  readonly expiresAt: string;
}
