import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
      const { password: passwordHash } = await this.userService.getOneByUsername(username);

      await compare(password, passwordHash);

      return true;
    } catch (error) {
      console.log('[AuthService] validateUser: ', error);

      return false;
    }
  }

  async login(user: { username: string; }) {
    const payload = { username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
