"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = void 0;
const data_source_1 = require("../data-source");
const Category_1 = require("../entities/Category");
// getrepositry pede a entity que eu desejo pegar
exports.categoryRepository = data_source_1.AppDataSource.getRepository(Category_1.Category);
