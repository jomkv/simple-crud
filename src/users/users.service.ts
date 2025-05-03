import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(newUser: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...newUser,
      },
    });
  }

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        userSetting: {
          select: {
            smsOn: true,
            notificationsOn: true,
          },
        },
      },
    });
  }

  getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userSetting: {
          select: {
            smsOn: true,
            notificationsOn: true,
          },
        },
      },
    });
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

  async updateUserSettingById(
    userId: number,
    updatedSetting: Prisma.UserSettingUpdateInput,
  ) {
    const userSettingExists = await this.prisma.userSetting.findUnique({
      where: { userId },
    });

    /**
     * If setting exists:
     *  update existing setting
     * Else:
     *  create new setting
     */
    if (userSettingExists) {
      return this.prisma.userSetting.update({
        where: { userId },
        data: updatedSetting,
      });
    } else {
      return this.prisma.userSetting.create({
        data: {
          notificationsOn: updatedSetting.notificationsOn as boolean,
          smsOn: updatedSetting.smsOn as boolean,
          user: {
            connect: { id: userId },
          },
        },
      });
    }
  }
}
