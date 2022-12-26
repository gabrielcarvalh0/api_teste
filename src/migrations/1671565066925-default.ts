import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671565066925 implements MigrationInterface {
    name = 'default1671565066925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "name" text NOT NULL, "mimetype" text NOT NULL, "size" text NOT NULL, "key" text NOT NULL, "path" text NOT NULL, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "upload"`);
    }

}
