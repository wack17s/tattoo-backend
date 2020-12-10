import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    type: "varchar",
    unique: true,
    nullable: false
  })
  public username: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  public password: string;
}
