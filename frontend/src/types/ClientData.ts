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
  creditedClientId: number;
  value: number;
  pixKey: string;
  message?: string;
  status: string;
};

type ClientData = {
  id: number,
  name: string,
  cpf: string,
  createdAt: Date,
  updatedAt: Date,
  dataValues?: {
    receivedPix?: ReceivedPixData[],
    paidPix?: PaidPixData[],
    id: number,
    name: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date,
  } 
};

export type {
  ReceivedPixData,
  PaidPixData,
  ClientData,
  PixToSend
};