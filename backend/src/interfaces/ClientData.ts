export default interface IClient {
  id?: number;
  name?: string;
  cpf?: string;
  password?: string;
  dataValues: {
    id: number
    name: string;
    cpf: string;
    password?: string;
  };
  receivedPix?: {
    id: number;
    payerClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
  };

  paidPix?: {
    id: number;
    creditedClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
  };

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

  receivedPix?: {
    id: number;
    payerClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
  };

  paidPix?: {
    id: number;
    creditedClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
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