"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRepository = void 0;
const data_source_1 = require("../data-source");
const Profile_1 = require("../entities/Profile");
// getrepositry pede a entity que eu desejo pegar
exports.profileRepository = data_source_1.AppDataSource.getRepository(Profile_1.Profile);
