import "reflect-metadata";
import { DataSource } from "typeorm";
import { NewUser } from "../entity/NewUser";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "lesson13",
  password: "password",
  database: "lesson13",
  synchronize: false,
  logging: true,
  entities: [NewUser], 
  migrations: ["../migrations/*.ts"], 
});