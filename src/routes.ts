import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { ProfileController } from "./controllers/ProfileController";
import { ProjectController } from "./controllers/ProjectController";
import { StatusController } from "./controllers/StatusController";
import { TypeController } from "./controllers/TypeController";
import { UserController } from "./controllers/UserController";
import { authMIddleware } from "./middlewares/authMIddleware";
import multer from "multer";
import { AdminController } from "./controllers/AdminController";
import { admMiddleware } from "./middlewares/admMiddleware";

const multerConfig = require("./config/multer");

const routes = Router();

// users
routes.get("/users", new UserController().getAllUsers);
routes.post("/authenticate/profile", new UserController().createUsers);
routes.post("/authenticate/login", new UserController().login);
routes.put(
  "/authenticate/profile",
  authMIddleware,
  new UserController().changeUserInfo
);

routes.post(
  "/authenticate/forgot_password",
  new UserController().forgotPassword
);
routes.post("/authenticate/reset_password", new UserController().resetPassword);

routes.post(
  "/profile/verific_email",
  authMIddleware,
  new UserController().verificEmail
);

routes.put(
  "/profile/email_verificad",
  authMIddleware,
  new UserController().emailVerificad
);

routes.post(
  "/profile/changePass",
  authMIddleware,
  new UserController().changeInfoPass
);
routes.post(
  "/profile/verific-pass",
  authMIddleware,
  new UserController().verificPass
);

// Profile
routes.get("/profile", new ProfileController().getAllProfileUsers);
routes.get(
  "/profile/user",
  authMIddleware,
  new ProfileController().getProfileAuthenticate
);

routes.get(
  "/profile/projects/:id",
  authMIddleware,
  new ProjectController().listAllProjectsForUser
);
routes.get(
  "/profile/projects_concluded/:id",
  authMIddleware,
  new ProjectController().ListAllProjectsConcluded
);
routes.get(
  "/projects/projects_of_id/:id",
  authMIddleware,
  new ProjectController().selectProjectOfId
);
/////////////////////////////************************************************* */
// ADM

routes.get(
  "/projects/projects_for_id/:id",
  admMiddleware,
  new ProjectController().selectProjectOfId
);
// Projects
routes.get("/project", admMiddleware, new ProjectController().getAllProjects);
routes.get("/projects_conluded", admMiddleware, new ProjectController().getAllProjectsConcluded);

routes.post(
  "/project",
  admMiddleware,
  new ProjectController().createNewProject
);
routes.put("/project", admMiddleware, new ProjectController().updateProject);
routes.delete("/project", admMiddleware, new ProjectController().deleteProject);

// Projects -> Types
routes.get(
  "/project/types_project",
  admMiddleware,
  new TypeController().getAllTypesProjects
);
routes.post(
  "/project/types_project",
  admMiddleware,
  new TypeController().createTypes
);
routes.put(
  "/project/types_project",
  admMiddleware,
  new TypeController().updateTypes
);
routes.delete(
  "/project/types_project",
  admMiddleware,
  new TypeController().deleteTypes
);

routes.post(
  "/project/send_project",
  authMIddleware,
  new ProjectController().sendProject
);

// Projects -> Status
routes.get(
  "/project/status_project",
  admMiddleware,
  new StatusController().getAllStatusProjects
);
routes.post(
  "/project/status_project",
  admMiddleware,
  new StatusController().createStatus
);
routes.put(
  "/project/status_project",
  admMiddleware,
  new StatusController().updateStatus
);
routes.delete(
  "/project/status_project",
  admMiddleware,
  new StatusController().deleteStatus
);

// Projects -> Status
routes.get(
  "/project/category_project",
  admMiddleware,
  new CategoryController().getAllCategorys
);
routes.post(
  "/project/category_project",
  admMiddleware,
  new CategoryController().createCategory
);
routes.put(
  "/project/category_project",
  admMiddleware,
  new CategoryController().updateCategory
);
routes.delete(
  "/project/category_project",
  admMiddleware,
  new CategoryController().deleteCategory
);

routes.get(
  "/admin/user",
  admMiddleware,
  new AdminController().getProfileAuthenticate
);

// Admm
routes.post("/admin", new AdminController().createAdmin);
routes.post("/admin/isAdmin", new AdminController().verificAdm);
routes.post("/admin/login", new AdminController().loginAdm);



export default routes;
