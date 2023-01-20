import { ClassSerializerInterceptor, Controller, Get,  Param, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from './models/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController { 

    constructor(private readonly userService:UserService) { }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
    
    @ApiBearerAuth('access-token')
    @Get('/:id')
    async findByEmail(@Param('id') id: number): Promise<User>{
       return await this.userService.findUserById(id);
    }

    
}


