"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const data_source_1 = require("../data-source");
const User_1 = require("../entities/User");
// getrepositry pede a entity que eu desejo pegar
exports.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
