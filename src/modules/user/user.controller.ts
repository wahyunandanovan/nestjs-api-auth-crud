import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from './models/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './models/dto/request/create-user.dto';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('access-token')
  @Roles('admin')
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiBearerAuth('access-token')
  @Get('/:id')
  async findByEmail(@Param('id') id: number): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @ApiBearerAuth('access-token')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.userService.updateUser(id, body);
    const res = {
      status: 200,
      message: 'user success updated',
      data: body,
    };
    return res;
  }
}
