import { Request, Response } from "express";
import { statusRepository } from "../repositories/statusRepository";
import { typeRepository } from "../repositories/typeRepository";

export class StatusController {
  // pega todos os profiles dos usuarios cadastrados
  async getAllStatusProjects(req: Request, res: Response) {
    const response = await statusRepository.find();
    return res.json(response);
  }
  // só mostra os profiles dos usuarios authenticados
  async createStatus(req: Request, res: Response) {
    try {
      const { name } = req.body;

      const newStatus = await statusRepository.create({
        name,
      });

      await statusRepository.save(newStatus);

      return res.status(201).json({ newStatus });
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatus(req: Request, res: Response) {
    const { id, name } = req.body;

    const statusExists = await statusRepository.findOneBy({ id });

    if (!statusExists)
      return res
        .status(400)
        .json({ message: "Esse tipo não existe no banco de dados." });
    await statusRepository.update(id, {
      name,
    });

    return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
  }

  async deleteStatus(req: Request, res: Response) {
    const { id } = req.body;

    const status = await statusRepository.findOneBy({ id });

    await statusRepository.delete(id);

    return res.status(201).json({ status });
  }
}
