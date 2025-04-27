import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: newUser });
  }

  getUser() {}

  getUserById() {}
}
