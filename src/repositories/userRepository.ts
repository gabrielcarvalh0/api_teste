import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

// getrepositry pede a entity que eu desejo pegar
export const userRepository = AppDataSource.getRepository(User);

