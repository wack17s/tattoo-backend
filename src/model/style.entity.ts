import { StyleName } from './../style/style.types';
import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'style' })
export class Style extends BaseEntity {
  @PrimaryColumn({
    type: "enum",
    enum: StyleName,
    unique: true
  })
  public name: StyleName;

  @Column({ type: 'varchar'})
  public en: string;
}
