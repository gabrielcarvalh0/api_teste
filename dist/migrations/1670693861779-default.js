"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1670693861779 = void 0;
class default1670693861779 {
    constructor() {
        this.name = 'default1670693861779';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "projectColors" text array NOT NULL, "currentFile" text NOT NULL, "projectModel" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "statusId" integer, "categoryId" integer, "typeId" integer, "userId" integer, CONSTRAINT "REL_5a833dfa646b99b852c67dd859" UNIQUE ("statusId"), CONSTRAINT "REL_b7d7d44e0e33834351af221757" UNIQUE ("categoryId"), CONSTRAINT "REL_a573d9e58cc758d53ae9371ed3" UNIQUE ("typeId"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_5a833dfa646b99b852c67dd8593" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_b7d7d44e0e33834351af221757d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_361a53ae58ef7034adc3c06f09f"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_a573d9e58cc758d53ae9371ed34"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_b7d7d44e0e33834351af221757d"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_5a833dfa646b99b852c67dd8593"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }
}
exports.default1670693861779 = default1670693861779;
