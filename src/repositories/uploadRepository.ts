import { AppDataSource } from "../data-source";
import { Upload } from "../entities/Upload";

// getrepositry pede a entity que eu desejo pegar
export const uploadRepository = AppDataSource.getRepository(Upload);

