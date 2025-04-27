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

  /**
   * Validates if a user exists based on the provided user ID.
   * @param value - The user ID passed as a parameter.
   * @param metadata - Metadata about the argument being processed (not used here).
   * @returns The user object if it exists.
   * @throws HttpException if the user does not exist.
   */
  async transform(value: number, metadata: ArgumentMetadata): Promise<User> {
    const user = await this.usersService.getUserById(value);

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }
}
