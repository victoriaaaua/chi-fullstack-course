import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { AppDataSource } from './data-source/data-source';

const app = createExpressServer({
    controllers: [UserController],
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const initializeDatabase = async () => {
    await AppDataSource.initialize();
}

initializeDatabase();

