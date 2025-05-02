import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserExistsPipe } from './pipes/user-exists.pipe';
import { User } from 'generated/prisma';
import { UpdateSettingsDto } from './dtos/update-setting.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe, UserExistsPipe) user: User) {
    return user;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe, UserExistsPipe) user: User,
  ) {
    return this.usersService.updateUserById(user.id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe, UserExistsPipe) user: User) {
    return this.usersService.deleteUserById(user.id);
  }

  @Patch(':id/settings')
  @UsePipes(ValidationPipe)
  updateUserSettings(
    @Body() newUserSettings: UpdateSettingsDto,
    @Param('id', ParseIntPipe, UserExistsPipe) user: User,
  ) {
    // TODO
  }
}
