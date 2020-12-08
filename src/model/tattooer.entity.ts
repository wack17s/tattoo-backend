import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'tattooer' })
@Index(["instagram"], { unique: true })
export class Tattooer extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', unique: true })
  public instagram: string;

  @Column({ type: 'boolean', default: false })
  public approved: boolean;

  @Column({ type: 'jsonb', default: [] })
  public posts: { id: string; uri: string; }[];

  @Column({ type: 'varchar', nullable: true })
  public city_id?: string;

  @Column({ type: 'varchar', array: true, nullable: true })
  public style_ids?: string[];

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
