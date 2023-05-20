import 'dotenv/config'
import 'module-alias/register'
import App from './config/server'
import UserController from "./modules/users/user/controller/user.controller";
import RoleController from "./modules/users/role/controller/role.controller";
import AuthController from "./modules/users/auth/controller/auth.controller";

const app = new App([new UserController(), new RoleController(), new AuthController()], Number(process.env.PORT))
app.listen();