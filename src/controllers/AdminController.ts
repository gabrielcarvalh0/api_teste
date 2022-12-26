import { Request, Response } from "express";
import { adminRepository } from "../repositories/adminRepository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import crypto from "crypto";
export class AdminController {
  // pega todos os profiles dos usuarios cadastrados
  async getAllTypesProjects(req: Request, res: Response) {
    const response = await adminRepository.find();
    return res.json(response);
  }
  async getProfileAuthenticate(req: Request, res: Response) {
    try {
      return res.json(req.user);
    } catch (error) {
      console.log(error);
    }
  }
  // só mostra os profiles dos usuarios authenticados
  async createAdmin(req: Request, res: Response) {
    const { userId, email } = req.body;
    try {
      const adminExists = await adminRepository.findOneBy({ email });

      if (adminExists) {
        return res.status(400).json({ message: "Esse adm já existe" });
      }
      console.log(userId, email);

      await adminRepository.find({
        relations: {
          user: true,
        },
      });
      const newAdmin = await adminRepository.create({
        user: {
          id: userId,
        },
        email,
      });

      await adminRepository.save(newAdmin);

      return res.status(201).json({ newAdmin });
    } catch (error) {
      console.log(error);
    }
  }
  async updateAdmin(req: Request, res: Response) {
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

  async deleteAdmin(req: Request, res: Response) {
    const { id } = req.body;

    const type = await adminRepository.findOneBy({ id });

    await adminRepository.delete(id);

    return res.status(201).json({ type });
  }
  async loginAdm(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const adm = await adminRepository.findOneBy({ email });

      if (!adm) {
        return res.status(400).json({ message: "E-mail ou senha inválido" });
      }
      const verifyPass = await bcrypt.compare(password, adm.user.password);
      if (!verifyPass) {
        return res.status(400).json({ message: "E-mail ou senha inválido" });
      }

      const token = sign({ id: adm.id }, process.env.JWT_PASS_ADM ?? "G@zao5107", {
        expiresIn: "8h",
      });

      const { password: _, ...admLogin } = adm.user;

      return res.json({
        adm: admLogin,
        token: token,
      });
    } catch (error) {
      res.status(401).json({ message: "Dados inválidos inseridos" });
    }
  }

  async verificAdm(req:Request, res: Response){
    const {email} = req.body;

    const existsAdm = await adminRepository.findOneBy({email});

     if(!existsAdm){
      return res.status(404).json({message: "Usuário não administrador"})
     }

    return res.status(200).json({existsAdm})
  }
}
