import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Exhibit } from './exhibits/exhibit.entity';
import { Comment } from './comments/comment.entity';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: "postgres",
    password: "victoria2001v!)",
    database: "lesson13",
    entities: [User, Exhibit, Comment],
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
});

