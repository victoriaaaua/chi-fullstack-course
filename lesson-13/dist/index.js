"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./controllers/UserController");
const data_source_1 = require("./data-source/data-source");
//const FILE_PATH = './files/users.json';
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [UserController_1.UserController],
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield data_source_1.AppDataSource.initialize();
});
initializeDatabase();
// app.use(bodyParser.json());
// function readFile() {
//     try {
//         const data = readFileSync(FILE_PATH, 'utf-8');
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error reading file: ", error);
//     }
// }
// function writeFile(users: User) {
//     try {
//         const jsonString = JSON.stringify(users);
//         writeFileSync(FILE_PATH, jsonString);
//     } catch (error) {
//         console.error('Error writing file: ', error);
//     }
// }
// app.get('/', (req: Request, res: Response) => {
//     res.send({
//         author: "Victoria",
//     })
// });
// app.get('/users', (req: Request, res: Response) => {
//     const users = readFile();
//     res.send(users);
// });
// app.post('/users', (req: Request, res: Response) => {
//     const users = readFile();
//     const newUser = Object.assign({ id: users.length + 1 }, req.body)
//     users.push(newUser);
//     writeFile(users);
//     res.send({
//         message: 'User has created',
//         newUser
//     });
// });
// app.patch('/users/:id', (req: Request, res: Response) => {
//     let id = parseInt(req.params.id);
//     const users = readFile();
//     const updatedUser = users.find((el: User) => el.id === id);
//     let index = users.indexOf(updatedUser);
//     Object.assign(updatedUser, req.body);
//     users[index] = updatedUser;
//     writeFile(users);
//     res.json({ message: 'User updated', user: updatedUser });
// });
// app.delete('/users/:id', (req: Request, res: Response) => {
//     let id = parseInt(req.params.id);
//     const users = readFile();
//     const deletedUser = users.find((el: User) => el.id === id);
//     let index = users.indexOf(deletedUser);
//     users.splice(index, 1);
//     writeFile(users);
//     res.json({ message: 'User deleted' });
// });
