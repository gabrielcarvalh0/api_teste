"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default1671565066925 = void 0;
class default1671565066925 {
    constructor() {
        this.name = 'default1671565066925';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "name" text NOT NULL, "mimetype" text NOT NULL, "size" text NOT NULL, "key" text NOT NULL, "path" text NOT NULL, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "upload"`);
    }
}
exports.default1671565066925 = default1671565066925;
