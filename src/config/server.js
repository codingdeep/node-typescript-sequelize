"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const db_connection_1 = __importDefault(require("./db/db.connection"));
class Server {
    constructor(controllers, port) {
        this.middlewareInit = () => {
            this.express.use((0, helmet_1.default)());
            this.express.use((0, cors_1.default)());
            this.express.use(express_1.default.json());
            this.express.use(express_1.default.urlencoded({ extended: false }));
            this.express.use((0, compression_1.default)());
        };
        this.controllerInit = () => {
            this.controllers.forEach((controller) => this.express.use("/api/v1", controller.router));
        };
        this.dbConnectionInit = () => __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default.connect();
        });
        this.express = (0, express_1.default)();
        this.port = port;
        this.controllers = controllers;
        this.middlewareInit();
        this.controllerInit();
        this.dbConnectionInit();
    }
    listen() {
        this.express.listen(this.port, () => console.log(`Server is running on http://localhost:${this.port}`));
    }
}
exports.default = Server;
