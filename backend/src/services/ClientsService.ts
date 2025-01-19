import ClientModel from "../database/models/Client";
import PixModel from "../database/models/Pix";
import IClient, { IClientData } from '../interfaces/ClientData';
import JsonWebToken from "../helpers/jsonWebToken";
const bCrypt = require('bcrypt');

class ClientsService {
  static model: ClientModel;
  bcrypt = bCrypt;

  constructor() {
    ClientsService.model = new ClientModel();
  }

  public getAllClients = async (): Promise<IClient[] | null> => {
    try {
      const clients = await ClientModel.findAll({
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: ['id', 'value', 'message', 'status'] },
          { model: PixModel, as: "paidPix", attributes: ['id', 'value', 'message', 'status'] },
        ],
      });

      if (!clients || clients.length === 0) return null;

      return clients;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getClientById = async (id: number): Promise<IClient | null> => {
    try {
      const client: IClient | null = await ClientModel.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: ['id', 'value', 'message', 'status', 'payerClientId'] },
          { model: PixModel, as: "paidPix", attributes: ['id', 'value', 'message', 'status', 'creditedClientId'] },
        ],
      });

      if (!client) return null;

      return client;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  static clientExists = async (cpf: string): Promise<boolean> => {
    try {
      const client = await ClientModel.findOne({ where: { cpf } });
      const exists = !!client;

      return exists;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getToken = async (client: IClient): Promise<string | null> => {
    try {
      const clientData = await ClientModel.findOne({ where: { cpf: client.cpf } });

      if (!clientData) return null;

      const token: string | null = await JsonWebToken.generate({
        dataValues: {
          id: clientData.dataValues.id,
          name: clientData.dataValues.name
        }
      });

      if (!token) return null;

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public createClient = async (clientData: IClient): Promise<IClientData | null> => {
    try {
      if (!clientData || !clientData.cpf) return null;

      const encryptedPassword = await bCrypt.hash(clientData.password, 10);
      clientData.password = encryptedPassword;

      const clientExists = await ClientsService.clientExists(clientData.cpf);
      if (clientExists) return null;

      let createdClient: IClientData = await ClientModel.create({ ...clientData });
      
      if (!createdClient) return null;

      const token = await JsonWebToken.generate({
        dataValues: {
          id: createdClient.dataValues.id,
          name: createdClient.dataValues.name
        }
      });
      
      delete createdClient.dataValues.password;
      delete createdClient._previousDataValues;
      delete createdClient.uniqno;
      delete createdClient._changed;
      delete createdClient._options;
      delete createdClient.isNewRecord;

      return { ...createdClient, token };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default ClientsService;
