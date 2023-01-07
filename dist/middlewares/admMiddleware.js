"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminRepository_1 = require("../repositories/adminRepository");
const admMiddleware = async (req, res, next) => {
    var _a;
    try {
        // pegando o authorization dentro do header da minha requisição
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Você não tem authorization" });
        }
        const token = authorization.split(" ")[1];
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS_ADM) !== null && _a !== void 0 ? _a : "G@zao5107");
        // verificando se existe usuario retornado do jwt no banco de dados
        const adm = await adminRepository_1.adminRepository.findOneBy({ id });
        if (!adm) {
            return res.status(401).json({ message: "Usuário não identificado" });
        }
        const { ...loggedUserAdm } = adm.user;
        req.user = loggedUserAdm;
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Token invalido" });
    }
};
exports.admMiddleware = admMiddleware;
