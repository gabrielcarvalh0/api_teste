import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

// getrepositry pede a entity que eu desejo pegar
export const categoryRepository = AppDataSource.getRepository(Category);

