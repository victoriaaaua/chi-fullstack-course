import { MigrationInterface, QueryRunner } from "typeorm";

export class ExhibitMigration1732809135766 implements MigrationInterface {
    name = 'ExhibitMigration1732809135766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exhibit" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "userId" integer NOT NULL, "commentCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cea6ca681dbeff3b69e0961a129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exhibit" ADD CONSTRAINT "FK_d6cee3785c355f9169d05cf9d8e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exhibit" DROP CONSTRAINT "FK_d6cee3785c355f9169d05cf9d8e"`);
        await queryRunner.query(`DROP TABLE "exhibit"`);
    }

}
