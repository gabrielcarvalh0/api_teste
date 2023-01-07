"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRepository = void 0;
const data_source_1 = require("../data-source");
const Projects_1 = require("../entities/Projects");
// getrepositry pede a entity que eu desejo pegar
exports.projectRepository = data_source_1.AppDataSource.getRepository(Projects_1.Projects);
