export default interface IClient {
  id: number;
  name: string;
  cpf: string;
  password?: string;

  token?: string | null;
}

export interface IClientData {
  dataValues: {
    id: number
    name: string;
    cpf: string;
    password?: string;
  };
  _previousDataValues?: object;
  uniqno?: number;
  _changed?: object;
  _options?: object;
  isNewRecord?: boolean;
  token?: string | null;
}