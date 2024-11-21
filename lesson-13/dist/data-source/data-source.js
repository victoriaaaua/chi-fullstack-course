"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const NewUser_1 = require("../entity/NewUser");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "lesson13",
    password: "password",
    database: "lesson13",
    synchronize: false,
    logging: true,
    entities: [NewUser_1.NewUser],
    migrations: ["../migrations/*.ts"],
});
