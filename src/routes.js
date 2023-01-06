"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("./controllers/CategoryController");
const ProfileController_1 = require("./controllers/ProfileController");
const ProjectController_1 = require("./controllers/ProjectController");
const StatusController_1 = require("./controllers/StatusController");
const TypeController_1 = require("./controllers/TypeController");
const UserController_1 = require("./controllers/UserController");
const authMIddleware_1 = require("./middlewares/authMIddleware");
const AdminController_1 = require("./controllers/AdminController");
const admMiddleware_1 = require("./middlewares/admMiddleware");
const multerConfig = require("./config/multer");
const routes = (0, express_1.Router)();
// users
routes.get("/users", new UserController_1.UserController().getAllUsers);
routes.post("/authenticate/profile", new UserController_1.UserController().createUsers);
routes.post("/authenticate/login", new UserController_1.UserController().login);
routes.put("/authenticate/profile", authMIddleware_1.authMIddleware, new UserController_1.UserController().changeUserInfo);
routes.post("/authenticate/forgot_password", new UserController_1.UserController().forgotPassword);
routes.post("/authenticate/reset_password", new UserController_1.UserController().resetPassword);
routes.post("/profile/verific_email", authMIddleware_1.authMIddleware, new UserController_1.UserController().verificEmail);
routes.put("/profile/email_verificad", authMIddleware_1.authMIddleware, new UserController_1.UserController().emailVerificad);
routes.post("/profile/changePass", authMIddleware_1.authMIddleware, new UserController_1.UserController().changeInfoPass);
routes.post("/profile/verific-pass", authMIddleware_1.authMIddleware, new UserController_1.UserController().verificPass);
// Profile
routes.get("/profile", new ProfileController_1.ProfileController().getAllProfileUsers);
routes.get("/profile/user", authMIddleware_1.authMIddleware, new ProfileController_1.ProfileController().getProfileAuthenticate);
routes.get("/profile/projects/:id", authMIddleware_1.authMIddleware, new ProjectController_1.ProjectController().listAllProjectsForUser);
routes.get("/profile/projects_concluded/:id", authMIddleware_1.authMIddleware, new ProjectController_1.ProjectController().ListAllProjectsConcluded);
routes.get("/projects/projects_of_id/:id", authMIddleware_1.authMIddleware, new ProjectController_1.ProjectController().selectProjectOfId);
/////////////////////////////************************************************* */
// ADM
// Projects
routes.get("/project", admMiddleware_1.admMiddleware, new ProjectController_1.ProjectController().getAllProjects);
routes.get("/projects_conluded", admMiddleware_1.admMiddleware, new ProjectController_1.ProjectController().getAllProjectsConcluded);
routes.post("/project", admMiddleware_1.admMiddleware, new ProjectController_1.ProjectController().createNewProject);
routes.put("/project", admMiddleware_1.admMiddleware, new ProjectController_1.ProjectController().updateProject);
routes.delete("/project", admMiddleware_1.admMiddleware, new ProjectController_1.ProjectController().deleteProject);
// Projects -> Types
routes.get("/project/types_project", admMiddleware_1.admMiddleware, new TypeController_1.TypeController().getAllTypesProjects);
routes.post("/project/types_project", admMiddleware_1.admMiddleware, new TypeController_1.TypeController().createTypes);
routes.put("/project/types_project", admMiddleware_1.admMiddleware, new TypeController_1.TypeController().updateTypes);
routes.delete("/project/types_project", admMiddleware_1.admMiddleware, new TypeController_1.TypeController().deleteTypes);
routes.post("/project/send_project", authMIddleware_1.authMIddleware, new ProjectController_1.ProjectController().sendProject);
// Projects -> Status
routes.get("/project/status_project", admMiddleware_1.admMiddleware, new StatusController_1.StatusController().getAllStatusProjects);
routes.post("/project/status_project", admMiddleware_1.admMiddleware, new StatusController_1.StatusController().createStatus);
routes.put("/project/status_project", admMiddleware_1.admMiddleware, new StatusController_1.StatusController().updateStatus);
routes.delete("/project/status_project", admMiddleware_1.admMiddleware, new StatusController_1.StatusController().deleteStatus);
// Projects -> Status
routes.get("/project/category_project", admMiddleware_1.admMiddleware, new CategoryController_1.CategoryController().getAllCategorys);
routes.post("/project/category_project", admMiddleware_1.admMiddleware, new CategoryController_1.CategoryController().createCategory);
routes.put("/project/category_project", admMiddleware_1.admMiddleware, new CategoryController_1.CategoryController().updateCategory);
routes.delete("/project/category_project", admMiddleware_1.admMiddleware, new CategoryController_1.CategoryController().deleteCategory);
routes.get("/admin/user", admMiddleware_1.admMiddleware, new AdminController_1.AdminController().getProfileAuthenticate);
// Admm
routes.post("/admin", new AdminController_1.AdminController().createAdmin);
routes.post("/admin/isAdmin", new AdminController_1.AdminController().verificAdm);
routes.post("/admin/login", new AdminController_1.AdminController().loginAdm);
exports.default = routes;
