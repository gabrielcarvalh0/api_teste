"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRepository = void 0;
const data_source_1 = require("../data-source");
const Status_1 = require("../entities/Status");
// getrepositry pede a entity que eu desejo pegar
exports.statusRepository = data_source_1.AppDataSource.getRepository(Status_1.Status);
