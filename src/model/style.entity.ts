import { Entity, Column, PrimaryColumn } from 'typeorm';

import { StyleName } from '../style/style.types';

import { BaseEntity } from './base.entity';

@Entity({ name: 'style' })
export class Style extends BaseEntity {
  @PrimaryColumn({
    type: "enum",
    enum: StyleName,
    unique: true
  })
  public name: StyleName;

  @Column({ type: 'varchar' })
  public en: string;

  @Column({ type: 'varchar', nullable: true })
  public ru: string;

  @Column({ type: 'varchar', nullable: true })
  public ua: string;
}
