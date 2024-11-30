import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOperation({ summary: "Get a current user" })
    @ApiQuery({ name: 'id', required: false, description: 'User ID' })
    @ApiQuery({ name: 'username', required: false, description: 'username' })
    @ApiResponse({
        status: 200,
        description: "User got successfully"
    })
    @ApiResponse({
        status: 404,
        description: "User not found"
    })
    async getAllUsers(
        @Query('id') id?: number,
        @Query('username') username?: string,
    ) {
        if (!id && !username) {
            throw new NotFoundException('Either ID or username must be provided')
        }
        const user = id ?
            await this.usersService.findById(id) :
            await this.usersService.findByUsername(username);

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }


    @Post('register')
    @ApiOperation({ summary: "Registration of new user" })
    @ApiResponse({
        status: 201,
        description: "The user has been successfully registered"
    })
    @ApiResponse({
        status: 400,
        description: "Invalid data format"
    })
    async register(@Body() createUserDto: CreateUserDto) {
        const existingUser = await this.usersService.findByUsername(createUserDto.username);
        
        if (existingUser) {
            throw new BadRequestException('Username is already taken');
        }

        const user = await this.usersService.create(createUserDto.username, createUserDto.password);
        return plainToInstance(User, user, { excludeExtraneousValues: true });
    }
}


