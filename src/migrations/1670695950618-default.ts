import { MigrationInterface, QueryRunner } from "typeorm";

export class default1670695950618 implements MigrationInterface {
    name = 'default1670695950618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "typeId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_5a833dfa646b99b852c67dd8593" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_b7d7d44e0e33834351af221757d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_b7d7d44e0e33834351af221757d"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_5a833dfa646b99b852c67dd8593"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "typeId"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "statusId"`);
    }

}
