"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const profileRepository_1 = require("../repositories/profileRepository");
class ProfileController {
    // pega todos os profiles dos usuarios cadastrados
    async getAllProfileUsers(req, res) {
        const response = await profileRepository_1.profileRepository.find();
        return res.json(response);
    }
    // só mostra os profiles dos usuarios authenticados
    async getProfileAuthenticate(req, res) {
        try {
            return res.json(req.user);
        }
        catch (error) {
            console.log(error);
        }
    }
    async userProfile(req, res) {
        const { profile } = req.user;
    }
    // async updateForDrive(req: Request, res: Response) {
    //   if (req.user.profile) {
    //     const { id } = req.user.profile;
    //     const {
    //       originalname: name,
    //       mimetype,
    //       size,
    //       key,
    //       path,
    //     } = (req as MulterRequest).file;
    //     try {
    //       uploadFile(name, mimetype, size, key, path, req.file).then((data) => {
    //         if (data) {
    //           const newProfile = profileRepository.update(id, {
    //             photo: `https://drive.google.com/file/d/${data}.${mimetype}`,
    //           });
    //           return res
    //             .status(201)
    //             .json({
    //               messgae: "Perfil alterado com sucesso!",
    //               newProfile,
    //               key,
    //             });
    //         }
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }
    async updateUserProfile(req, res) {
        console.log(req);
        // if (req.user.profile) {
        //   const { id } = req.user.profile;
        //   const {
        //      name,
        //     mimetype,
        //     size,
        //     key,
        //     path,
        //   } = (req as MulterRequest).file;
        //   try {
        //     uploadFile(name, mimetype, size, key, path, req.file).then((data) => {
        //       if (data) {
        //         const newProfile = profileRepository.update(id, {
        //           photo: key,
        //         });
        //         return res
        //           .status(201)
        //           .json({
        //             messgae: "Perfil alterado com sucesso!",
        //             newProfile,
        //             key,
        //           });
        //       }
        //     });
        //   } catch (error) {
        //     console.log(error);
        //   }
        // }
    }
}
exports.ProfileController = ProfileController;
