import { IsEnum, IsString, IsDefined, IsOptional } from 'class-validator';

import { CityName } from './../city.types';

export class CreateCityDto {
  @IsDefined()
  @IsEnum(CityName)
  public name: CityName;

  @IsOptional()
  @IsString()
  public en?: string;

  @IsDefined()
  @IsString()
  public ru: string;

  @IsOptional()
  @IsString()
  public ua?: string;
}
