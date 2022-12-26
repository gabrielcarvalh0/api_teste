import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { projectRepository } from "../repositories/projectRepository";
import { Equal, Not } from "typeorm";

const mailer = require("../services/mailer");

interface MulterRequest extends Request {
  file: any;
}

export class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    const response = await projectRepository.find({
      relations: {
        user: true,
        status: true,
        type: true,
        category: true,
      },
    });
    console.log(response);
    return res.json(response);
  }
  async listAllProjectsForUser(req: Request, res: Response) {
    const { id } = req.user;
    try {
      const response = await userRepository.findOne({
        where: {
          id: id,
          projects: {
            status: Not("2"),
          },
        },

        relations: {
          projects: {
            status: true,
            category: true,
            type: true,
          },
        },
      });

      return res.json(response);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async ListAllProjectsConcluded(req: Request, res: Response) {
    const { id } = req.user;
    try {
      const response = await userRepository.findOne({
        where: {
          id: id,
          projects: {
            status: Equal("2"),
          },
        },

        relations: {
          projects: {
            status: true,
            category: true,
            type: true,
          },
        },
      });

      return res.json(response);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  async createNewProject(req: Request, res: Response) {
    const {
      name,
      type,
      projectColors,
      category,
      currentFile,
      projectModel,
      description,
      status,
      createdAt,
      user,
      projectValueInNumeric,
      projectPayment,
      projectTime,
      projectLink,
    } = req.body;

    const { id } = user;
    // const {name, email } = user;

    const userExists = await userRepository.findOneBy({ id });

    if (!userExists) {
      return res.status(400).json({ message: "Esse usuário não existe" });
    }

    const newProject = await projectRepository.create({
      name,
      description,
      type,
      status,
      projectColors,
      category,
      currentFile,
      projectModel,
      createdAt,
      projectValueInNumeric,
      projectPayment,
      projectTime,
      projectLink,
      user: {
        id,
      },
    });

    await projectRepository.find({
      relations: {
        user: true,
        category: true,
        type: true,
        status: true,
      },
    });

    await projectRepository.save(newProject);

    return res.status(201).json({ newProject });
  }

  async projectStatusDeleted(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
  async deleteProject(req: Request, res: Response) {
    const { id } = req.body;

    try {
      const project = await projectRepository.findOneBy({ id });

      await projectRepository.delete(id);

      return res.status(201).json({ project });
    } catch (error) {
      res.status(400).json({ message: "Erro em deletar esse projeto." });
    }
  }
  async updateProject(req: Request, res: Response) {
    const {
      id,
      name,
      type,
      projectColors,
      category,
      currentFile,
      projectModel,
      description,
      status,
      createdAt,
      projectValueInNumeric,
      projectPayment,
      projectTime,
      projectLink,
    } = req.body;

    try {
      const projectExists = await projectRepository.findOneBy({ id });

      if (!projectExists) {
        return res.status(400).json({ message: "Esse projeto não existe" });
      }

      const updateProject = await projectRepository.update(id, {
        name,
        description,
        type,
        status,
        projectColors,
        category,
        currentFile,
        projectModel,
        createdAt,
        projectValueInNumeric,
        projectPayment,
        projectTime,
        projectLink,
      });

      return res.status(201).json({ updateProject });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async selectProjectOfId(req: Request, res: Response) {
    const { id } = req.params;
    const idInt = parseInt(id);
    try {
      const response = await projectRepository.findOne({
        where: {
          id: idInt,
        },
        relations: {
          status: true,
          type: true,
          category: true,
        },
      });

      return res.json(response);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async sendProject(req: Request, res: Response) {
    // mudar o status
    // enviar e-mail

    try {
      const { id, status,  name: projectName} = req.body;
      const { name: userName } = req.user;
      const updateProjectAnalysis = await projectRepository.update(id, {
        status,
      });
      mailer.sendMail(
        {
          to: "gragencia.ofc@gmail.com",
          from: "gragencia.ofc@gmail.com",
          template: "send_project",
          subject: `Projeto ${projectName} enviado`,
          context: {
            userName
          },
        },
        (err: any) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ err });
          }

          return res.send();
        }
      );
    return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  }
}
