import { AppDataSource } from "../data-source";
import { Profile } from "../entities/Profile";

// getrepositry pede a entity que eu desejo pegar
export const profileRepository = AppDataSource.getRepository(Profile);

