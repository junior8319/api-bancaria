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

  public getClientById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const client = await this.clientsService.getClientById(id);

    if (client) {
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: `Client with id ${id} not found` });
    }
  }

  public createClient = async (req: Request, res: Response) => {
    const clientData: IClient = req.body;
    const client = await this.clientsService.createClient(clientData);

    if (client) {
      res.status(201).json(client);
    } else {
      res.status(500).json(this.serverErrorMessage);
    }
  }
}

export default new ClientsController();