import { AppDataSource } from "../data-source";
import { Status } from "../entities/Status";

// getrepositry pede a entity que eu desejo pegar
export const statusRepository = AppDataSource.getRepository(Status);

