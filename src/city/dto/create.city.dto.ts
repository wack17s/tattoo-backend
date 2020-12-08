import { IsEnum, IsString, IsDefined } from 'class-validator';

import { CityName } from './../city.types';

export class CreateCityDto {
  @IsDefined()
  @IsEnum(CityName)
  public name: CityName;

  @IsDefined()
  @IsString()
  public en: string;

  @IsDefined()
  @IsString()
  public ru: string;

  @IsDefined()
  @IsString()
  public ua: string;
}
