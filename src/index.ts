import 'dotenv/config'
import 'module-alias/register'
import App from './config/server'
import UserController from "@/resources/user/user.controller";
import RoleController from "@/resources/role/role.controller";
import AuthController from "@/resources/auth/auth.controller";

const app = new App([new UserController(), new RoleController(), new AuthController()], Number(process.env.PORT))
app.listen();