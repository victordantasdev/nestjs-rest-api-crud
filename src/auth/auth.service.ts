import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { message: 'I\'ve signed up' };
  }

  signin() {
    return { message: 'I\'ve signed in' };
  }
}
