"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671648231522 = void 0;
class default1671648231522 {
    constructor() {
        this.name = 'default1671648231522';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" ADD "idUser" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "email" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "idUser"`);
    }
}
exports.default1671648231522 = default1671648231522;
