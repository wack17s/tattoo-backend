import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

import { CityName } from './../city/city.types';
import { StyleName } from './../style/style.types';

import { BaseEntity } from './base.entity';

@Entity({ name: 'tattooer' })
@Index(["instagram"], { unique: true })
export class Tattooer extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  public instagram: string;

  @Column({ type: 'boolean', default: false })
  public approved: boolean;

  @Column({ type: 'jsonb', default: [] })
  public posts: { id: string; uri: string; }[];

  @Column({ type: 'enum', enum: CityName, nullable: true })
  public city?: CityName;

  @Column({ type: 'enum', enum: StyleName, array: true, nullable: true })
  public styles?: StyleName[];

  @Column({ type: 'varchar', nullable: true })
  public profilePic?: string;

  @Column({ type: 'varchar', nullable: true })
  public about?: string;

  @Column({ type: 'varchar', nullable: true })
  public aboutRaw?: string;

  @Column({ type: 'varchar', nullable: true })
  public postsCount?: string;

  @Column({ type: 'varchar', nullable: true })
  public followersCount?: string;

  @Column({ type: 'varchar', nullable: true })
  public followingCount?: string;
}
