import { Request, Response } from "express";
import ClientsService from "../services/ClientsService";
import IClient from "../interfaces/ClientData";

class ClientsController {
  public clientsService: ClientsService;
  public serverErrorMessage!: object;

  constructor() {
    this.clientsService = new ClientsService();
  }

  public getAllClients = async (req: Request, res: Response) => {
    const clients = await this.clientsService.getAllClients();

    res.status(200).json(clients);
  }
}

export default new ClientsController();