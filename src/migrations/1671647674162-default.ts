import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671647674162 implements MigrationInterface {
    name = 'default1671647674162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963" UNIQUE ("adminId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adminId"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
