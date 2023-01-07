"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeController = void 0;
const typeRepository_1 = require("../repositories/typeRepository");
class TypeController {
    // pega todos os profiles dos usuarios cadastrados
    async getAllTypesProjects(req, res) {
        const response = await typeRepository_1.typeRepository.find();
        return res.json(response);
    }
    // só mostra os profiles dos usuarios authenticados
    async createTypes(req, res) {
        try {
            const { name } = req.body;
            const typeExists = await typeRepository_1.typeRepository.findOneBy({ name });
            if (typeExists) {
                return res
                    .status(400)
                    .json({ message: "Esse tipo de projeto já existe." });
            }
            const newType = await typeRepository_1.typeRepository.create({
                name,
            });
            await typeRepository_1.typeRepository.save(newType);
            return res.status(201).json({ newType });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateTypes(req, res) {
        const { id, name } = req.body;
        const typeExists = await typeRepository_1.typeRepository.findOneBy({ id });
        if (!typeExists) {
            return res
                .status(400)
                .json({ message: "Esse tipo não existe no banco de dados." });
        }
        await typeRepository_1.typeRepository.update(id, {
            name,
        });
        return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
    }
    async deleteTypes(req, res) {
        const { id } = req.body;
        const type = await typeRepository_1.typeRepository.findOneBy({ id });
        await typeRepository_1.typeRepository.delete(id);
        return res.status(201).json({ type });
    }
}
exports.TypeController = TypeController;
