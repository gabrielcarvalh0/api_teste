"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeRepository = void 0;
const data_source_1 = require("../data-source");
const Type_1 = require("../entities/Type");
// getrepositry pede a entity que eu desejo pegar
exports.typeRepository = data_source_1.AppDataSource.getRepository(Type_1.TypeProject);
