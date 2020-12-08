import { CityName } from './../city/city.types';
import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'city' })
export class City extends BaseEntity {
  @PrimaryColumn({
    type: "enum",
    enum: CityName,
    unique: true
  })
  public name: CityName;

  @Column({ type: 'varchar' })
  public en: string;

  @Column({ type: 'varchar' })
  public ru: string;

  @Column({ type: 'varchar' })
  public ua: string;
}
