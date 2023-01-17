import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    // generate password hash
    const hash = await argon.hash(password);

    try {
      // save user to db
      const user = await this.prisma.user.create({
        data: {
          email,
          hash,
        }
      });

      delete user.hash;

      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Credatials taken')
      }
    }
  }

  signin() {
    return { message: 'I\'ve signed in' };
  }
}
