import { Request, Response } from "express";
import ClientsService from "../services/ClientsService";
import IClient, { ILogin } from "../interfaces/ClientData";

class ClientsController {
  public clientsService: ClientsService;
  public serverErrorMessage!: object;

  constructor() {
    this.clientsService = new ClientsService();
  }

  public getAllClients = async (req: Request, res: Response) => {
    const clients = await this.clientsService.getAllClients();    

    if (clients && clients.length > 0) {      
      res.status(200).json(clients);
    } else {
      res.status(404).json({ message: 'No clients found' });
    }
      
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

  public login = async (req: Request, res: Response) => {
    const loginData: ILogin = req.body;
    const client = await this.clientsService.login(loginData);

    if (client) {
      res.status(200).json(client);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}

export default new ClientsController();