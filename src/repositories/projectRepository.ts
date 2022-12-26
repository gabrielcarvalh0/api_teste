import { AppDataSource } from "../data-source";
import { Projects } from "../entities/Projects";

// getrepositry pede a entity que eu desejo pegar
export const projectRepository = AppDataSource.getRepository(Projects);

