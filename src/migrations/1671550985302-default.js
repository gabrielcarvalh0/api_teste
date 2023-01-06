"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671550985302 = void 0;
class default1671550985302 {
    constructor() {
        this.name = 'default1671550985302';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" integer NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" text NOT NULL`);
    }
}
exports.default1671550985302 = default1671550985302;
