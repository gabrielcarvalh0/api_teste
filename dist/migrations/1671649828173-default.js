"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671649828173 = void 0;
class default1671649828173 {
    constructor() {
        this.name = 'default1671649828173';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "adminId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "adminId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_dd44ce70ffde87b2f0e46b98963" UNIQUE ("adminId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_dd44ce70ffde87b2f0e46b98963" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.default1671649828173 = default1671649828173;
