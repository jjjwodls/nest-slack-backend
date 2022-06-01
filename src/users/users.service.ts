import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  postUsers(email: string, nickName: string, password: string) {
    throw new Error('Method not implemented.');
  }
}
