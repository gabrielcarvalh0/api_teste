import { AppDataSource } from "../data-source";
import { Admin } from "../entities/Admin";

// getrepositry pede a entity que eu desejo pegar
export const adminRepository = AppDataSource.getRepository(Admin);

