"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1670694806180 = void 0;
class default1670694806180 {
    constructor() {
        this.name = 'default1670694806180';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_5a833dfa646b99b852c67dd8593"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_b7d7d44e0e33834351af221757d"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "REL_5a833dfa646b99b852c67dd859"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "statusId"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "REL_b7d7d44e0e33834351af221757"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "REL_a573d9e58cc758d53ae9371ed3"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "typeId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" ADD "typeId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "REL_a573d9e58cc758d53ae9371ed3" UNIQUE ("typeId")`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "REL_b7d7d44e0e33834351af221757" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "statusId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "REL_5a833dfa646b99b852c67dd859" UNIQUE ("statusId")`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_b7d7d44e0e33834351af221757d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_5a833dfa646b99b852c67dd8593" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.default1670694806180 = default1670694806180;
