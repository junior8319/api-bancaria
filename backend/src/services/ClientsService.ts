import ClientModel from "../database/models/Client";
import PixModel from "../database/models/Pix";
import IClient, { IClientData, ILogin } from '../interfaces/ClientData';
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
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
        ],
      });

      if (!clients || clients.length === 0) return null;

      return clients;
    } catch (error) {
      console.log(error);      
      throw new Error((error as Error).message);
    }
  }

  public getClientById = async (id: number): Promise<IClient | null> => {
    try {
      const client: IClient | null = await ClientModel.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
        ],
      });

      if (!client) return null;

      return client;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getClientByName = async (name: string): Promise<IClient | null> => {
    try {
      const client: IClient | null = await ClientModel.findOne({
        where: { name },
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
        ],
      });

      if (!client) return null;

      return client;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getClientByCpf = async (cpf: string): Promise<IClient | null> => {
    try {
      const client: IClient | null = await ClientModel.findOne({
        where: { cpf },
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
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

  static cleanClientData = (client: IClientData): IClientData => {
    delete client.dataValues.password; 
    delete client._previousDataValues;
    delete client.uniqno;
    delete client._changed;
    delete client._options;
    delete client.isNewRecord;

    return { ...client };
  }

  public getToken = async (client: IClient): Promise<string | null> => {
    try {
      const clientData = await ClientModel.findOne({
        where: { cpf: client.cpf },
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
        ],
      });

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

  public createClient = async (clientData: IClient): Promise<IClient | null> => {
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
      
      createdClient = ClientsService.cleanClientData(createdClient);

      const message = `Cliente cadastrado com sucesso! ID: ${createdClient.dataValues.id}`;
      
      return { 
        dataValues: {
          id: createdClient.dataValues.id,
          name: createdClient.dataValues.name,
          cpf: createdClient.dataValues.cpf,
        },
        token,
        message
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public login = async (clientData: ILogin): Promise<IClient | null> => {
    try {
      if (
        !clientData ||
        !clientData.cpf ||
        !clientData.password ||
        clientData.cpf.length < 13
      ) return null;      

      let client: IClientData | null = await ClientModel.findOne({
        where: { cpf: clientData.cpf },
        include: [
          { model: PixModel, as: "receivedPix", attributes: [
            'id',
            'payerClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
          { model: PixModel, as: "paidPix", attributes: [
            'id',
            'creditedClientId',
            'pixKey',
            'value',
            'message',
            'status',
            'createdAt',
            'updatedAt'
          ] },
        ],
      });
      if (!client) return null;

      const passwordMatch = await bCrypt.compare(clientData.password, client.dataValues.password);
      if (!passwordMatch) return null;
      
      client = ClientsService.cleanClientData(client);

      const token = await this.getToken({
        id: client.dataValues.id,
        name: client.dataValues.name,
        cpf: client.dataValues.cpf,
        dataValues: client.dataValues
      });
      if (!token) return null;

      const message = `Login efetuado com sucesso! Boas vindas, ${client.dataValues.name}!`;
      return { 
        ...client,
        token, 
        message 
      };
 
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public testTokenIsActive = async (token: string): Promise<string | object> => {
    try {
      const decodedToken = await JsonWebToken.verify(token);
      if (!decodedToken) return { message: 'Token inválido' };

      return decodedToken;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default ClientsService;
