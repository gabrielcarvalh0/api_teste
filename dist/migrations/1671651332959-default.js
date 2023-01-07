"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671651332959 = void 0;
class default1671651332959 {
    constructor() {
        this.name = 'default1671651332959';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adminId"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "UQ_f8a889c4362d78f056960ca6dad" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_f8a889c4362d78f056960ca6dad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "UQ_f8a889c4362d78f056960ca6dad"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963" UNIQUE ("adminId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.default1671651332959 = default1671651332959;
