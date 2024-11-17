import { Request, Response } from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { readFileSync, writeFileSync } from 'fs';
import bodyParser from 'body-parser';
import { User } from './interfaces/User';

const FILE_PATH = './files/users.json';

const app = createExpressServer({
    controllers: [UserController],
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(bodyParser.json());


function readFile() {
    try {
        const data = readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file: ", error);
    }
}


function writeFile(users: User) {
    try {
        const jsonString = JSON.stringify(users);
        writeFileSync(FILE_PATH, jsonString);
    } catch (error) {
        console.error('Error writing file: ', error);
    }
}


app.get('/', (req: Request, res: Response) => {
    res.send({
        author: "Victoria",
    })
});

app.get('/users', (req: Request, res: Response) => {
    const users = readFile();
    res.send(users);
});

app.post('/users', (req: Request, res: Response) => {

    const users = readFile();
    const newUser = Object.assign({ id: users.length + 1 }, req.body)
    users.push(newUser);
    writeFile(users);
    res.send({
        message: 'User has created',
        newUser
    });
});


app.patch('/users/:id', (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const users = readFile();
    const updatedUser = users.find((el: User) => el.id === id);
    let index = users.indexOf(updatedUser);
    Object.assign(updatedUser, req.body);

    users[index] = updatedUser;
    writeFile(users);
    res.json({ message: 'User updated', user: updatedUser });
});


app.delete('/users/:id', (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    const users = readFile();
    const deletedUser = users.find((el: User) => el.id === id);
    let index = users.indexOf(deletedUser);
    users.splice(index, 1);
    writeFile(users);
    res.json({ message: 'User deleted' });
});
