import { AppDataSource } from "../data-source";
import { TypeProject } from "../entities/Type";

// getrepositry pede a entity que eu desejo pegar
export const typeRepository = AppDataSource.getRepository(TypeProject);

