import { Router } from "express";
import ClientsController from "../controllers/ClientsController";

const clientsRouter = Router();

clientsRouter.get("/clients", ClientsController.getAllClients);
clientsRouter.get("/clients/:id", ClientsController.getClientById);
clientsRouter.post("/clients", ClientsController.createClient);

export default clientsRouter;