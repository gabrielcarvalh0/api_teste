"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671550374858 = void 0;
class default1671550374858 {
    constructor() {
        this.name = 'default1671550374858';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectValue" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectPayment" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" date NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectPayment"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectValue"`);
    }
}
exports.default1671550374858 = default1671550374858;
