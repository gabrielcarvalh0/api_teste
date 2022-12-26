import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import crypto from "crypto";
const mailer = require("../services/mailer");

export class UserController {
  // Cria novos usuaios
  async createUsers(req: Request, res: Response) {
    const {
      name,
      email,
      profile,
      password,
      email_verificad,
      passwordResetToken,
      passwordResetExpires,
      emailResetToken,
      emailResetExpires,
      phone,
      phone_verificad,

    } = req.body;

    const { description, photo, skills } = profile;

    try {
      const userExists = await userRepository.findOneBy({ email });

      if (userExists) {
        return res
          .status(400)
          .json({ message: "Email já cadastrado no banco de dados!" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepository.create({
        name,
        email,
        email_verificad: email_verificad || false,
        password: hashPassword,
        profile: {
          description: description || `Olá meu nome é ${name}`,
          photo:
            photo ||
            "https://res.cloudinary.com/dydwaeqqy/image/upload/v1670354898/avatar_thj6mz.svg",
          skills: skills || [],
        },
        passwordResetToken: "",
        passwordResetExpires: "",
        emailResetToken: "",
        emailResetExpires: "",
        phone: phone || "",
        phone_verificad: phone_verificad || false,

      });

      await userRepository.find({
        relations: {
          profile: true,
          projects: true,

        },
      });

      const token = sign(
        { id: newUser.id },
        process.env.JWT_PASS ?? "G@zao5107",
        { expiresIn: "8h" }
      );

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return res.status(201).json({ user, token: token });
    } catch (error) {
      res.status(400).send({ error, message: "Erro em cadastrar usuário." });
    }
  }

  // loga na aplicação
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(400).json({ message: "E-mail ou senha inválido" });
      }
      const verifyPass = await bcrypt.compare(password, user.password);
      if (!verifyPass) {
        return res.status(400).json({ message: "E-mail ou senha inválido" });
      }

      const token = sign({ id: user.id }, process.env.JWT_PASS ?? "G@zao5107", {
        expiresIn: "8h",
      });

      const { password: _, ...userLogin } = user;

      return res.json({
        user: userLogin,
        token: token,
      });
    } catch (error) {
      res.status(401).json({ message: "Dados inválidos inseridos" });
    }
  }

  // pega todos os usuarios cadastrados
  async getAllUsers(req: Request, res: Response) {
    const response = await userRepository.find({
      relations: {
        profile: true,
        projects: true,
      },
    });
    return res.json(response);
  }

  // Altera as informações dos usuarios autenticados
  async changeUserInfo(req: Request, res: Response) {
    try {
      const { email, phone } = req.body;
      let emailVerificad = true;
      const userUpdate = await userRepository.findOneBy({
        id: req.user.id,
      });

      const userExists = await userRepository.findOneBy({ email });

      if (userExists && userExists.id !== userUpdate?.id) {
        return res
          .status(400)
          .json({ message: "Esse e-mail já existe na plataforma" });
        }
        if (userUpdate) {
          console.log('->', email, userUpdate.email, userExists);
          if(email == userExists ){
            console.log('esse e-mail é o mesmo do user')
          }
          userRepository.update(userUpdate.id, {
          email: email || userUpdate.email,
          phone: phone || userUpdate.phone,
          email_verificad:  userExists === null && email === userUpdate.email ? true : false

        });

        // profileRepository.update(userUpdate.profile.id, {
        //   description: description || `Olá meu nome é ${userUpdate.name}`,
        //   photo: photo || "https://res.cloudinary.com/dydwaeqqy/image/upload/v1670354898/avatar_thj6mz.svg",
        // });

        await userRepository.find({
          relations: {
            profile: true,
          },
        });

        return res.status(201).json(userUpdate);
      } else {
        res.status(400).json("Erro no servidor");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // altera a senha dos usuarios autenticados
  async changeInfoPass(req: Request, res: Response) {
    try {
      const { password, confirmPassword } = req.body;

      const userUpdate = await userRepository.findOneBy({
        id: req.user.id,
        email: req.user.email,
        password: req.user.password,
      });

      // const userExists = await userRepository.findOneBy({ email });

      // const hashPassword = await bcrypt.hash(password, 10);
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ message: "Senhas digitadas não conferem." });
      } else {
        if (userUpdate) {
          const hashPassword = await bcrypt.hash(password, 10);

          userUpdate.password = hashPassword || userUpdate.password;

          await userRepository.save(userUpdate);

          const { password: _, ...user } = userUpdate;

          return res.status(201).json({ user });
        } else {
          res.status(400).json("Erro no servidor");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // verifica a nova senha do usuario
  async verificPass(req: Request, res: Response) {
    try {
      const { password } = req.body;

      const userLogged = await userRepository.findOneBy({
        id: req.user.id,
      });

      if (userLogged) {
        const verifyPass = await bcrypt.compare(password, userLogged?.password);

        if (!verifyPass) {
          return res.status(400).json({ message: "Senha inválida" });
        }
        return res.json(verifyPass);
      }
    } catch (error) {
      return res.json({ message: "Erro interno: 501GR" });
    }
  }

  async verificEmail(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado." });
      }
      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userRepository.update(user.id, {
        emailResetToken: token,
        emailResetExpires: now,
      });

      mailer.sendMail(
        {
          to: email,
          from: "gazalves01@gmail.com",
          template: "auth/confirm_email",
          subject: "Confirme seu e-mail - GR Agência",
          context: {
            email,
            token,
          },
        },
        (err: any) => {
          if (err) {
            console.log(err);
            return res.status(400).send({ err });
          }

          res.status(201).send({ message: "E-mail enviado com sucesso!" });
        }
      );
      console.log(token, now);
    } catch (error) {
      res.status(400).send({ message: "Erro em confirmar e-mail." });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado." });
      }
      const token = crypto.randomBytes(20).toString("hex");

      const now = new Date();
      now.setHours(now.getHours() + 1);

      await userRepository.update(user.id, {
        passwordResetToken: token,
        passwordResetExpires: now,
      });

      mailer.sendMail(
        {
          to: email,
          from: "gazalves01@gmail.com",
          template: "auth/forgot_password",
          subject: "Atualize sua senha - GR Agência",
          context: {
            token,
            email,
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
      console.log(token, now);
    } catch (error) {
      res.status(400).send({ message: "Erro em redefinir sua senha." });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { email, token, password } = req.body;

    try {
      const user = await userRepository.findOneBy({ email });
      console.log(user);
      if (!user)
        return res.status(400).json({ message: "Esse usuário não existe" });

      if (token !== user.passwordResetToken) {
        console.log(token, user.passwordResetToken);
        return res.status(400).json({ message: "Token inválido" });
      }
      const now = new Date();

      if (now > user.passwordResetExpires) {
        return res
          .status(400)
          .json({ message: "Token expirado, gere um novo" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      user.password = hashPassword;

      await userRepository.save(user);
      res.status(201).send({ message: "Senha redefinida com sucesso!" });
    } catch (err) {
      res.status(400).send({ message: "Erro em resetar senha" });
    }
  }

  async emailVerificad(req: Request, res: Response) {
    const { emailVerificad } = req.body;
    console.log(emailVerificad);
    try {
      const userLogged = await userRepository.findOneBy({
        id: req.user.id,
      });

      if (!userLogged) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      } else {
        userRepository.update(userLogged.id, {
          email_verificad: emailVerificad,
        });

        return res
          .status(200)
          .json({ message: "E-mail verificado com sucesso!" });
      }
    } catch (error) {
      return res.status(401).json({ message: "Erro interno desconhecido." });
    }
  }
}
