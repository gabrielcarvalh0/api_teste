"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepository = void 0;
const data_source_1 = require("../data-source");
const Admin_1 = require("../entities/Admin");
// getrepositry pede a entity que eu desejo pegar
exports.adminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
