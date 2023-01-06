"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671551066883 = void 0;
class default1671551066883 {
    constructor() {
        this.name = 'default1671551066883';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValue"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValueInNumeric" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValueInNumeric"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValue" text NOT NULL`);
    }
}
exports.default1671551066883 = default1671551066883;
