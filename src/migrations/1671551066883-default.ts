import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671551066883 implements MigrationInterface {
    name = 'default1671551066883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValue"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValueInNumeric" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValueInNumeric"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValue" text NOT NULL`);
    }

}
