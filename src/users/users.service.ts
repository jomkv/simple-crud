import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: newUser });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}
