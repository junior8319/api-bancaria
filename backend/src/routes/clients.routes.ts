import { Router } from "express";
import ClientsController from "../controllers/ClientsController";
import PixController from "../controllers/PixController";
import validateToken from "../middlewares/validateToken";

const clientsRouter = Router();

clientsRouter.get("/clients", ClientsController.getAllClients);
clientsRouter.get("/clients/:id", ClientsController.getClientById);
clientsRouter.post("/clients", ClientsController.createClient);
clientsRouter.post("/login", ClientsController.login);
clientsRouter.post("/pix", validateToken, PixController.createPix);

export default clientsRouter;