import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  signup(dto: AuthDto) {
    console.log({ dto })

    return { message: 'I\'ve signed up' };
  }

  signin() {
    return { message: 'I\'ve signed in' };
  }
}
