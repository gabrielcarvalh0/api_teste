import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671648231522 implements MigrationInterface {
    name = 'default1671648231522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "idUser" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "idUser"`);
    }

}
