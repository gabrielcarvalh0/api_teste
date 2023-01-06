"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMIddleware = void 0;
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminRepository_1 = require("../repositories/adminRepository");
const authMIddleware = async (req, res, next) => {
    var _a, _b;
    try {
        // pegando o authorization dentro do header da minha requisição
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Você não tem authorization" });
        }
        const token = authorization.split(" ")[1];
        const { id } = jsonwebtoken_1.default.verify(token, (_b = (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : process.env.JWT_PASS_ADM) !== null && _b !== void 0 ? _b : "G@zao5107");
        // verificando se existe usuario retornado do jwt no banco de dados
        const user = await userRepository_1.userRepository.findOneBy({ id });
        const adm = await adminRepository_1.adminRepository.findOneBy({ id });
        if (adm) {
            const { password: _, ...loggedUser } = adm.user;
            req.user = loggedUser;
        }
        else {
            if (!user) {
                return res.status(401).json({ message: "Usuário não identificado" });
            }
            const { password: _, ...loggedUser } = user;
            req.user = loggedUser;
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Token invalido" });
    }
};
exports.authMIddleware = authMIddleware;
