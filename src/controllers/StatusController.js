"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const statusRepository_1 = require("../repositories/statusRepository");
class StatusController {
    // pega todos os profiles dos usuarios cadastrados
    async getAllStatusProjects(req, res) {
        const response = await statusRepository_1.statusRepository.find();
        return res.json(response);
    }
    // só mostra os profiles dos usuarios authenticados
    async createStatus(req, res) {
        try {
            const { name } = req.body;
            const newStatus = await statusRepository_1.statusRepository.create({
                name,
            });
            await statusRepository_1.statusRepository.save(newStatus);
            return res.status(201).json({ newStatus });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateStatus(req, res) {
        const { id, name } = req.body;
        const statusExists = await statusRepository_1.statusRepository.findOneBy({ id });
        if (!statusExists)
            return res
                .status(400)
                .json({ message: "Esse tipo não existe no banco de dados." });
        await statusRepository_1.statusRepository.update(id, {
            name,
        });
        return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
    }
    async deleteStatus(req, res) {
        const { id } = req.body;
        const status = await statusRepository_1.statusRepository.findOneBy({ id });
        await statusRepository_1.statusRepository.delete(id);
        return res.status(201).json({ status });
    }
}
exports.StatusController = StatusController;
