import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1732228426904 implements MigrationInterface {
    name = 'InitialMigration1732228426904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "new_user" ("id" SERIAL NOT NULL, "user" text NOT NULL DEFAULT '', "email" character varying NOT NULL, CONSTRAINT "UQ_583b1b130dce0fcb99363708b20" UNIQUE ("email"), CONSTRAINT "PK_3b49972bfaad960b1e4d58f5bb8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "new_user"`);
    }

}
