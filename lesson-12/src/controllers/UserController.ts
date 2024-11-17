import { Get, Param, Post, Body, JsonController, Patch, Delete } from 'routing-controllers';
import { ValidateArgs } from '../decorators/validator' 
import { FileService } from '../FileService';
import { User } from '../interfaces/User';

@JsonController("/")
export class UserController {
    @Get('/')
    getAuthor() {
        return { author : "Victoria" };
    }

    @Get('users')
    getAll() {
        return FileService.readFile();
    }

    @Post('users')
    @ValidateArgs()
    createUser(@Body() body: User) {
        const users = FileService.readFile();
        const newUser = Object.assign({id: users.length + 1}, body) 
        users.push(newUser);
        FileService.writeFile(users);
        return { message: 'User created', newUser };
    }

    @Patch('users/:id')
    @ValidateArgs()
    updateUser(@Param('id') id : number, @Body() body: User){
        const users = FileService.readFile();
        const updatedUser = users.find((el: User) => el.id === id);
        let index = users.indexOf(updatedUser);
        Object.assign(updatedUser, body);
        users[index] = updatedUser;
        FileService.writeFile(users);
        return { message: 'User updated' };
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id : number){
        const users = FileService.readFile();
        const deletedUser = users.find((el: User) => el.id === id);
        let index = users.indexOf(deletedUser);
        users.splice(index, 1);
        FileService.writeFile(users);
        return { message: 'User deleted' };
    }
}

