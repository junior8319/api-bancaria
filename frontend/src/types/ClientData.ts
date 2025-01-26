type ReceivedPixData = {
  id: number,
  value: number,
  message?: string,
  status: string,
  payerClientId: number,
  createdAt: Date,
  pixKey: string,
}

type PaidPixData = {
  id: number,
  value: number,
  message?: string,
  status: string,
  creditedClientId: number,
  createdAt: Date,
  pixKey: string,
}

type PixToSend = {
  creditedClientId?: number;
  value?: number;
  pixKey?: string;
  message?: string;
  status?: string;
};

type ClientData = {
  id: number,
  name: string,
  cpf: string,
  createdAt: Date,
  updatedAt: Date,
  receivedPix?: ReceivedPixData[],
  paidPix?: PaidPixData[],
  dataValues?: {
    receivedPix?: ReceivedPixData[],
    paidPix?: PaidPixData[],
    id: number,
    name: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date,
    message?: string
  },
  token?: string,
  message?: string
};
export type {
  ReceivedPixData,
  PaidPixData,
  ClientData,
  PixToSend,
};