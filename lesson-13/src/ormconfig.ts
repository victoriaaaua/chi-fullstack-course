import { DataSource } from 'typeorm';
import { NewUser } from './entity/NewUser';


export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: "postgres",
    password: "victoria2001v!)",
    database: "lesson13",
    migrations: ['./src/migrations/*.ts'],
    synchronize: false,
    entities: [
        NewUser,
       __dirname + "/entities/**/*.entity.ts"
    ]
});

