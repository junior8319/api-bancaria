import ClientModel from "../database/models/Client";
import PixModel from "../database/models/Pix";
import IClient from "../interfaces/ClientData";

class ClientsService {
  static model: ClientModel;

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
      const client = await ClientModel.findByPk(id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: PixModel, as: "creditor", attributes: ['id', 'value', 'message', 'status'] },
          { model: PixModel, as: "payer", attributes: ['id', 'value', 'message', 'status'] },
        ],
      });
      return client;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default ClientsService;
