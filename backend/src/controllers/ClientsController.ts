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

  public getClientByCpf = async (req: Request, res: Response) => {
    const cpf = req.query.cpf as string;
    const client = await this.clientsService.getClientByCpf(cpf);
    if (!client || !client.id) {
      res.status(404).json({ message: `Client with CPF ${cpf} not found` });
    }
    res.status(200).json(client);
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

  public testTokenIsActive = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        const tokenData = await this.clientsService.testTokenIsActive(token);
        if (tokenData) {
          res.status(200).json(tokenData);
        } else {
          res.status(401).json({ message: 'Token is invalid' });
        }
      } else {
        res.status(400).json({ message: 'Token is missing' });
      }
    } catch (error) {
      res.status(500).json(this.serverErrorMessage);
    }
  }
}

export default new ClientsController();