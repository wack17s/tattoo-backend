import { IsEnum, IsString, IsDefined, IsOptional } from 'class-validator';

import { StyleName } from './../style.types';

export class CreateStyleDto {
  @IsDefined()
  @IsEnum(StyleName)
  public name: StyleName;

  @IsDefined()
  @IsString()
  public en: string;

  @IsOptional()
  @IsString()
  public ru?: string;

  @IsOptional()
  @IsString()
  public ua?: string;
}
