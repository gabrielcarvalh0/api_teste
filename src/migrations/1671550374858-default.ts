import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671550374858 implements MigrationInterface {
    name = 'default1671550374858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValue" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValue"`);
    }

}
