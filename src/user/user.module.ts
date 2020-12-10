import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../model/user.entity';

import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
