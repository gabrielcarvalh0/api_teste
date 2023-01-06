"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRepository = void 0;
const data_source_1 = require("../data-source");
const Upload_1 = require("../entities/Upload");
// getrepositry pede a entity que eu desejo pegar
exports.uploadRepository = data_source_1.AppDataSource.getRepository(Upload_1.Upload);
