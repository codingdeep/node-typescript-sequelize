import {Sequelize} from "sequelize-typescript";
import UserModel from "../../models/user.model";
import RoleModel from "../../models/role.model";
import UserRoleModel from "../../models/user.role.model";
const config = require(__dirname+'/db.data');
const env = process.env.NODE_ENV || 'development';

class DbConnection{
   private static connection: Sequelize;
   static getConnection():Sequelize{
       if(!DbConnection.connection){
           const dbConfig = config[env] as any;
           DbConnection.connection = new Sequelize(
               dbConfig.database,
               dbConfig.username,
               dbConfig.password,
               {
                   ...dbConfig,
                   models: [UserModel, RoleModel, UserRoleModel]
               }
           )

       }
       return DbConnection.connection;
   }

   static async connect(){
      try{
          await this.getConnection().sync()
          console.log("DB Connection established")
      }catch (e: any){
          console.log(e)
      }
   }
}

export default DbConnection;