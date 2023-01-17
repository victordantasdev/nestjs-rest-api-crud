import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    // generate password hash
    const hash = await argon.hash(password);

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
  }

  signin() {
    return { message: 'I\'ve signed in' };
  }
}
