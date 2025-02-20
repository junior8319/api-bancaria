"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientsController_1 = __importDefault(require("../controllers/ClientsController"));
const PixController_1 = __importDefault(require("../controllers/PixController"));
const validateToken_1 = __importDefault(require("../middlewares/validateToken"));
const clientsRouter = (0, express_1.Router)();
clientsRouter.get("/clients", ClientsController_1.default.getAllClients);
clientsRouter.get("/clients/cpf", ClientsController_1.default.getClientByCpf);
clientsRouter.get("/clients/:id", ClientsController_1.default.getClientById);
clientsRouter.post("/clients", ClientsController_1.default.createClient);
clientsRouter.post("/login", ClientsController_1.default.login);
clientsRouter.post("/pix", validateToken_1.default, PixController_1.default.createPix);
clientsRouter.post("/test-token", validateToken_1.default, ClientsController_1.default.testTokenIsActive);
exports.default = clientsRouter;
