import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { User } from '../model/user.entity';

import { CreateUserDto } from './dto/create.user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userModel: Repository<User>) {
    // this.createOne({ username: 'adminPetuh', password: 'pizda1299!' });
  }

  public async getOneByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  public async createOne({ password, username }: CreateUserDto) {
    try {
      const passwordHash = await hash(password, SALT_ROUNDS);
      await compare(password, passwordHash);
    
      const createdUser = this.userModel.create({ username, password: passwordHash });

      await this.userModel.save(createdUser);

      return createdUser;
    } catch (error) {
      console.log('UserService createOne: ', error);
    }
  }
}