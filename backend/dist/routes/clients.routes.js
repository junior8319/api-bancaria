"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClientsController_1 = __importDefault(require("../controllers/ClientsController"));
const clientsRouter = (0, express_1.Router)();
clientsRouter.get("/clients", ClientsController_1.default.getAllClients);
clientsRouter.get("/clients/:id", ClientsController_1.default.getClientById);
clientsRouter.post("/clients", ClientsController_1.default.createClient);
exports.default = clientsRouter;
