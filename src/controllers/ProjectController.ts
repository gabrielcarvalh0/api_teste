import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { projectRepository } from "../repositories/projectRepository";
import { Equal, Not } from "typeorm";

const mailer = require("../services/mailer");



export class ProjectController {
  async getAllProjects(req: Request, res: Response) {
    const response = await projectRepository.find({
      where: {
        status: Not("2"),
      },
      relations: {
        user: true,
        status: true,
        type: true,
        category: true,
      },
    });
    return res.json(response);
  }
  async getAllProjectsConcluded(req: Request, res: Response) {
    const response = await projectRepository.find({
      where: {
        status: Equal("2"),
      },
      relations: {
        status: true,
        category: true,
        type: true,
        user: true,
      },
    });
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
      id,
      projectValueInNumeric,
      projectPayment,
      projectTime,
      projectLink,
    } = req.body;
console.log(req.body)
    const { id: typeId, name: typeName } = type;
    try {
      const userExists = await userRepository.findOneBy({ id });

      if (!userExists) {
        return res.status(400).json({ message: "Esse usuário não existe" });
      }

      const newProject = await projectRepository.create({
        name,
        description,
        type: typeId,
        status,
        projectColors,
        category,
        currentFile,
        projectModel,
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

      mailer.sendMail(
        {
          to: userExists.email,
          from: process.env.MAIL_FROM_DEFAULT,
          template: "new_project",
          subject: `Novo projeto: ${name} - confira agora - GR Agência`,
          context: {
            name,
            typeName,
            description,
            currentFile,
            baseUrl: process.env.BASE_URL,
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
      return res.status(201).json({ newProject });
    } catch (error) {
      res.status(400).json({ error });
    }
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
      email,
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

      await projectRepository.find({
        relations: {
          user: true,
        },
      });
if(status === 2){
  mailer.sendMail(
    {
      to: email,
      from: process.env.MAIL_FROM_DEFAULT,
      template: "update_project",
      subject: `Projeto concluído: ${name} - confira agora - GR Agência`,
      context: {
        name,
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
}else{
  mailer.sendMail(
    {
      to: email,
      from: process.env.MAIL_FROM_DEFAULT,
      template: "update_project",
      subject: `Nova alteração no projeto: ${name} - confira agora - GR Agência`,
      context: {
        name,
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
}

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
          user: true,
        },
      });

      return res.json(response);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async sendProject(req: Request, res: Response) {

    const { id, status, name: projectName } = req.body;
    const { name: userName } = req.user;

    try {
      const updateProjectAnalysis = await projectRepository.update(id, {
        status,
      });

      mailer.sendMail(
        {
          to: process.env.MAIL_FROM_DEFAULT,
          from: process.env.MAIL_FROM_DEFAULT,
          template: "send_project",
          subject: `Projeto ${projectName} enviado`,
          context: {
            userName,
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
