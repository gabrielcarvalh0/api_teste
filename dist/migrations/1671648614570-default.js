"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671648614570 = void 0;
class default1671648614570 {
    constructor() {
        this.name = 'default1671648614570';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "idUser" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_f8a889c4362d78f056960ca6dad" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "userId" TO "idUser"`);
    }
}
exports.default1671648614570 = default1671648614570;
