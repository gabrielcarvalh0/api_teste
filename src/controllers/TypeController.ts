import { Request, Response } from "express";
import { typeRepository } from "../repositories/typeRepository";

export class TypeController {
  // pega todos os profiles dos usuarios cadastrados
  async getAllTypesProjects(req: Request, res: Response) {
    const response = await typeRepository.find();
    return res.json(response);
  }

  // só mostra os profiles dos usuarios authenticados
  async createTypes(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const typeExists = await typeRepository.findOneBy({ name });

      if (typeExists) {
        return res
          .status(400)
          .json({ message: "Esse tipo de projeto já existe." });
      }

      const newType = await typeRepository.create({
        name,
      });

      await typeRepository.save(newType);

      return res.status(201).json({ newType });
    } catch (error) {
      console.log(error);
    }
  }
  async updateTypes(req: Request, res: Response) {
    const { id, name } = req.body;

    const typeExists = await typeRepository.findOneBy({ id });

    if (!typeExists) {
      return res
        .status(400)
        .json({ message: "Esse tipo não existe no banco de dados." });
    }
    await typeRepository.update(id, {
      name,
    });

    return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
  }

  async deleteTypes(req: Request, res: Response) {
    const { id } = req.body;

    const type = await typeRepository.findOneBy({ id });

    await typeRepository.delete(id);

    return res.status(201).json({ type });
  }
}
