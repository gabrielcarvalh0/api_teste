"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
class CategoryController {
    async getAllCategorys(req, res) {
        const response = await categoryRepository_1.categoryRepository.find();
        return res.json(response);
    }
    // só mostra os profiles dos usuarios authenticados
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const newCategory = await categoryRepository_1.categoryRepository.create({
                name,
            });
            await categoryRepository_1.categoryRepository.save(newCategory);
            return res.status(201).json({ newCategory });
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateCategory(req, res) {
        const { id, name } = req.body;
        const categoryExists = await categoryRepository_1.categoryRepository.findOneBy({ id });
        if (!categoryExists)
            return res
                .status(400)
                .json({ message: "Essa categoria não existe no banco de dados." });
        await categoryRepository_1.categoryRepository.update(id, {
            name,
        });
        return res.status(201).json({ messgae: "Categoria alterado com sucesso!" });
    }
    async deleteCategory(req, res) {
        const { id } = req.body;
        const category = await categoryRepository_1.categoryRepository.findOneBy({ id });
        await categoryRepository_1.categoryRepository.delete(id);
        return res.status(201).json({ category });
    }
}
exports.CategoryController = CategoryController;
