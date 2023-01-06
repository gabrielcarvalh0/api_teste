"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671604879528 = void 0;
class default1671604879528 {
    constructor() {
        this.name = 'default1671604879528';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" ADD "projectLink" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "projectLink"`);
    }
}
exports.default1671604879528 = default1671604879528;
