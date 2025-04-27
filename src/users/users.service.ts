import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: newUser });
  }

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async deleteUserById(userId: number): Promise<User> {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  async updateUserById(
    userId: number,
    updatedUser: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (updatedUser.username) {
      const isUsernameTaken = await this.prisma.user.findUnique({
        where: { username: updatedUser.username as string },
      });

      if (isUsernameTaken)
        throw new HttpException('Username already taken', 400);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updatedUser,
    });
  }
}
