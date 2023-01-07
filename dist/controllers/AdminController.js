"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const adminRepository_1 = require("../repositories/adminRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AdminController {
    // pega todos os profiles dos usuarios cadastrados
    async getAllTypesProjects(req, res) {
        const response = await adminRepository_1.adminRepository.find();
        return res.json(response);
    }
    async getProfileAuthenticate(req, res) {
        try {
            return res.json(req.user);
        }
        catch (error) {
            console.log(error);
        }
    }
    // só mostra os profiles dos usuarios authenticados
    async createAdmin(req, res) {
        const { userId, email } = req.body;
        try {
            const adminExists = await adminRepository_1.adminRepository.findOneBy({ email });
            if (adminExists) {
                return res.status(400).json({ message: "Esse adm já existe" });
            }
            await adminRepository_1.adminRepository.find({
                relations: {
                    user: true,
                },
            });
            const newAdmin = await adminRepository_1.adminRepository.create({
                user: {
                    id: userId,
                },
                email,
            });
            await adminRepository_1.adminRepository.save(newAdmin);
            return res.status(201).json({ newAdmin });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateAdmin(req, res) {
        const { id, name } = req.body;
        // const typeExists = await adminRepository.findOneBy({ id });
        // if (!typeExists) {
        //   return res
        //     .status(400)
        //     .json({ message: "Esse tipo não existe no banco de dados." });
        // }
        // await adminRepository.update(id, {
        //   name,
        // });
        return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
    }
    async deleteAdmin(req, res) {
        const { id } = req.body;
        const type = await adminRepository_1.adminRepository.findOneBy({ id });
        await adminRepository_1.adminRepository.delete(id);
        return res.status(201).json({ type });
    }
    async loginAdm(req, res) {
        var _a;
        const { email, password } = req.body;
        try {
            const adm = await adminRepository_1.adminRepository.findOneBy({ email });
            if (!adm) {
                return res.status(400).json({ message: "E-mail ou senha inválido" });
            }
            const verifyPass = await bcrypt_1.default.compare(password, adm.user.password);
            if (!verifyPass) {
                return res.status(400).json({ message: "E-mail ou senha inválido" });
            }
            const token = (0, jsonwebtoken_1.sign)({ id: adm.id }, (_a = process.env.JWT_PASS_ADM) !== null && _a !== void 0 ? _a : "G@zao5107", {
                expiresIn: "8h",
            });
            const { password: _, ...admLogin } = adm.user;
            return res.json({
                adm: admLogin,
                token: token,
            });
        }
        catch (error) {
            res.status(401).json({ message: "Dados inválidos inseridos" });
        }
    }
    async verificAdm(req, res) {
        const { email } = req.body;
        const existsAdm = await adminRepository_1.adminRepository.findOneBy({ email });
        if (!existsAdm) {
            return res.status(404).json({ message: "Usuário não administrador" });
        }
        return res.status(200).json({ existsAdm });
    }
}
exports.AdminController = AdminController;
