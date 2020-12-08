import { IsEnum, IsString, IsDefined } from 'class-validator';

import { StyleName } from './../style.types';

export class CreateStyleDto {
  @IsDefined()
  @IsEnum(StyleName)
  public name: StyleName;

  @IsDefined()
  @IsString()
  public en: string;

  // ru: string;
  // ua: string;
}
