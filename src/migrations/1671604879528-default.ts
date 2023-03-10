import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671604879528 implements MigrationInterface {
    name = 'default1671604879528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectLink" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectLink"`);
    }

}
