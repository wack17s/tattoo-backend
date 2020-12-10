import { IsString, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  public username: string;

  @IsDefined()
  @IsString()
  public password: string;
}
