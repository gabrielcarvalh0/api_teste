import { Request, Response } from "express";
import { categoryRepository } from "../repositories/categoryRepository";

export class CategoryController {
  async getAllCategorys(req: Request, res: Response) {
    const response = await categoryRepository.find();
    return res.json(response);
  }
  // só mostra os profiles dos usuarios authenticados
  async createCategory(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const newCategory = await categoryRepository.create({
        name,
      });

      await categoryRepository.save(newCategory);

      return res.status(201).json({ newCategory });
    } catch (error) {
      console.log(error);
    }
  }

  async updateCategory(req: Request, res: Response) {
    const { id, name } = req.body;
    const categoryExists = await categoryRepository.findOneBy({ id });

    if (!categoryExists)
      return res
        .status(400)
        .json({ message: "Essa categoria não existe no banco de dados." });
    await categoryRepository.update(id, {
        name,
    });

    return res.status(201).json({ messgae: "Categoria alterado com sucesso!" });
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.body;

    const category = await categoryRepository.findOneBy({ id });

    await categoryRepository.delete(id);

    return res.status(201).json({ category });
  }
}
