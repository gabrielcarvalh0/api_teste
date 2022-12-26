import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671552296449 implements MigrationInterface {
    name = 'default1671552296449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" date NOT NULL`);
    }

}
