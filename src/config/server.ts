import express, {Application, NextFunction, Request, Response} from "express";
import compression from "compression";
import cors from 'cors'
import helmet from "helmet";
import * as Interfaces from '../utils/interfaces'
import DbConnection from "./db/db.connection";
import GlobalExceptionHandler from "@/utils/exception/global.exception.handler";
import passport from "passport";
import passportUtil from "@/utils/passport.util";
import userDeserializer from "@/middlewares/user.deserialize.middleware";

class Server {
    public express: Application;
    public port: number;
    public controllers: Array<Interfaces.IController>

    constructor(controllers: Array<Interfaces.IController>, port: number) {
        this.express = express();
        this.port = port;
        this.controllers = controllers;
        this.middlewareInit();
        this.passportInit();
        this.controllerInit();
        this.dbConnectionInit();
        this.errorManagementInit();
    }

    private middlewareInit = (): void => {
        this.express.use(userDeserializer)
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(compression())
    }

    private passportInit(): void {
        this.express.use(passport.initialize())
        passportUtil(passport);
    }

    private controllerInit = (): void => {
        this.controllers.forEach((controller: Interfaces.IController) => this.express.use("/api/v1", controller.router))
    }
    private dbConnectionInit = async () => {
        await DbConnection.connect();
    }

    private errorManagementInit(): void {
        this.express.use(GlobalExceptionHandler)
    }

    public listen(): void {
        this.express.listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}`))
    }
}

export default Server