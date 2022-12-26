import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken";
import { adminRepository } from "../repositories/adminRepository";

type JwtPayload = {
  id: number;
};

export const admMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // pegando o authorization dentro do header da minha requisição
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Você não tem authorization" });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(
      token,
      process.env.JWT_PASS_ADM ?? "G@zao5107"
    ) as JwtPayload;

    // verificando se existe usuario retornado do jwt no banco de dados
    const adm = await adminRepository.findOneBy({ id });

    if (!adm) {
      return res.status(401).json({ message: "Usuário não identificado" });
    }

    const { ...loggedUserAdm } = adm.user;

    req.user = loggedUserAdm;

    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalido" });
  }
};
