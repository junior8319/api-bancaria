export default interface IClient {
  id: number;
  name: string;
  cpf: string;
  password?: string;

  token?: string | null;
  message?: string;
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

export interface ILogin {
  cpf?: string;
  name?: string;
  password: string;
}