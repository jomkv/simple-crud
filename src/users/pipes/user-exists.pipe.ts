import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { User } from 'generated/prisma';
import { UsersService } from '../users.service';

@Injectable()
export class UserExistsPipe implements PipeTransform<number, Promise<User>> {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: number, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.usersService.getUserById(value);

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }
}
