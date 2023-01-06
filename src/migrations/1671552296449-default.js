"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671552296449 = void 0;
class default1671552296449 {
    constructor() {
        this.name = 'default1671552296449';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectTime"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectTime" date NOT NULL`);
    }
}
exports.default1671552296449 = default1671552296449;
