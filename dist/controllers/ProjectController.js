"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const projectRepository_1 = require("../repositories/projectRepository");
const typeorm_1 = require("typeorm");
const mailer = require("../services/mailer");
class ProjectController {
    async getAllProjects(req, res) {
        const response = await projectRepository_1.projectRepository.find({
            where: {
                status: (0, typeorm_1.Not)("2"),
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
    async getAllProjectsConcluded(req, res) {
        const response = await projectRepository_1.projectRepository.find({
            where: {
                status: (0, typeorm_1.Equal)("2"),
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
    async listAllProjectsForUser(req, res) {
        const { id } = req.user;
        try {
            const response = await userRepository_1.userRepository.findOne({
                where: {
                    id: id,
                    projects: {
                        status: (0, typeorm_1.Not)("2"),
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
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async ListAllProjectsConcluded(req, res) {
        const { id } = req.user;
        try {
            const response = await userRepository_1.userRepository.findOne({
                where: {
                    id: id,
                    projects: {
                        status: (0, typeorm_1.Equal)("2"),
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
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async createNewProject(req, res) {
        const { name, type, projectColors, category, currentFile, projectModel, description, status, id, projectValueInNumeric, projectPayment, projectTime, projectLink, } = req.body;
        console.log(req.body);
        const { id: typeId, name: typeName } = type;
        try {
            const userExists = await userRepository_1.userRepository.findOneBy({ id });
            if (!userExists) {
                return res.status(400).json({ message: "Esse usuário não existe" });
            }
            const newProject = await projectRepository_1.projectRepository.create({
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
            await projectRepository_1.projectRepository.find({
                relations: {
                    user: true,
                    category: true,
                    type: true,
                    status: true,
                },
            });
            await projectRepository_1.projectRepository.save(newProject);
            mailer.sendMail({
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
            }, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ err });
                }
                return res.send();
            });
            return res.status(201).json({ newProject });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async projectStatusDeleted(req, res) {
        try {
        }
        catch (error) { }
    }
    async deleteProject(req, res) {
        const { id } = req.body;
        try {
            const project = await projectRepository_1.projectRepository.findOneBy({ id });
            await projectRepository_1.projectRepository.delete(id);
            return res.status(201).json({ project });
        }
        catch (error) {
            res.status(400).json({ message: "Erro em deletar esse projeto." });
        }
    }
    async updateProject(req, res) {
        const { id, name, type, projectColors, category, currentFile, projectModel, description, status, createdAt, projectValueInNumeric, projectPayment, projectTime, projectLink, email, } = req.body;
        try {
            const projectExists = await projectRepository_1.projectRepository.findOneBy({ id });
            if (!projectExists) {
                return res.status(400).json({ message: "Esse projeto não existe" });
            }
            const updateProject = await projectRepository_1.projectRepository.update(id, {
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
            await projectRepository_1.projectRepository.find({
                relations: {
                    user: true,
                },
            });
            if (status === 2) {
                mailer.sendMail({
                    to: email,
                    from: process.env.MAIL_FROM_DEFAULT,
                    template: "update_project",
                    subject: `Projeto concluído: ${name} - confira agora - GR Agência`,
                    context: {
                        name,
                    },
                }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ err });
                    }
                    return res.send();
                });
            }
            else {
                mailer.sendMail({
                    to: email,
                    from: process.env.MAIL_FROM_DEFAULT,
                    template: "update_project",
                    subject: `Nova alteração no projeto: ${name} - confira agora - GR Agência`,
                    context: {
                        name,
                    },
                }, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ err });
                    }
                    return res.send();
                });
            }
            return res.status(201).json({ updateProject });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async selectProjectOfId(req, res) {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const response = await projectRepository_1.projectRepository.findOne({
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
        }
        catch (error) {
            res.status(400).json({ error });
        }
    }
    async sendProject(req, res) {
        const { id, status, name: projectName } = req.body;
        const { name: userName } = req.user;
        try {
            const updateProjectAnalysis = await projectRepository_1.projectRepository.update(id, {
                status,
            });
            mailer.sendMail({
                to: process.env.MAIL_FROM_DEFAULT,
                from: process.env.MAIL_FROM_DEFAULT,
                template: "send_project",
                subject: `Projeto ${projectName} enviado`,
                context: {
                    userName,
                },
            }, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ err });
                }
                return res.send();
            });
            return res.status(201).json({ messgae: "Tipo alterado com sucesso!" });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.ProjectController = ProjectController;
