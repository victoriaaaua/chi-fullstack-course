import { Get, Param, Post, Body, JsonController, Patch, Delete } from 'routing-controllers';
import { ValidateArgs } from '../decorators/validator' 
import { User } from '../interfaces/User';
import { AppDataSource } from '../data-source/data-source';
import { NewUser } from '../entity/NewUser';

@JsonController("/users")
export class UserController {
    @Get('/author')
    getAuthor() {
        return { author : "Victoria" };
    }

    @Get('/')
    async getAll() {
        const users = await AppDataSource.getRepository(NewUser).find();
        return users;
    }

    @Get('/:id')
    async getOne(@Param('id') id: number) {
        const user = await AppDataSource.getRepository(NewUser).findOne({ where: { id } });
        return user;
    }

    @Post('/')
    @ValidateArgs()
    async createUser(@Body() body: User) {
        const newUser = AppDataSource.getRepository(NewUser).create(body);
        await AppDataSource.getRepository(NewUser).save(newUser);
        return { message: 'User created', newUser };
    }

    @Patch('/:id')
    @ValidateArgs()
    async updateUser(@Param('id') id : number, @Body() body: User){
        const updatedUser = await AppDataSource.getRepository(NewUser).findOne({where: {id}});
        if (!updatedUser) {
            return { message: 'User not found' };
        }
        Object.assign(updatedUser, body);
        await AppDataSource.getRepository(NewUser).save(updatedUser);
        return { message: 'User updated' };
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id : number){
        const deletedUser = await AppDataSource.getRepository(NewUser).findOne({where: {id}});
        if (!deletedUser) {
            return { message: 'User not found' };
        }
        await AppDataSource.getRepository(NewUser).remove(deletedUser);
        return { message: 'User deleted' };
    }
}

