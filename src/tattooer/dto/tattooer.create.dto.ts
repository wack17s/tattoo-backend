import { IsString, IsDefined, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class PostDto {
  @IsDefined()
  @IsString()
  public id: string;

  @IsDefined()
  @IsString()
  public uri: string;
}

export class PostsDto extends Array<PostDto> {}

export class CreateTattooerDto {
  @IsDefined()
  @IsString()
  public instagram: string;

  @IsOptional()
  @IsString()
  public city_id?: string;

  @IsOptional()
  @IsString({ each: true })
  public style_ids?: string[];

  @IsOptional()
  @IsString()
  public about?: string;

  @IsOptional()
  @IsString()
  public aboutRaw?: string;

  @IsOptional()
  @IsString()
  public profilePic?: string;

  @IsOptional()
  @IsString({ each: true })
  public postIds?: string[];

  @IsOptional()
  @IsString()
  public postsCount?: string;

  @IsOptional()
  @IsString()
  public followersCount?: string;

  @IsOptional()
  @IsString()
  public followingCount?: string;

  @Type(() => PostsDto)
  public posts?: PostsDto;
}
