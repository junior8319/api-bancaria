export default interface IPix {
  id: number;
  creditedClientId: number;
  payerClientId: number;
  value: number;
  pixKey: string;
  message?: string;
  status: string;
  returnMessage?: string;
}


export interface IPixData {
  dataValues: {
    id: number;
    creditedClientId: number;
    payerClientId: number;
    value: number;
    pixKey: string;
    message?: string;
    status: string;
  };
  returnMessage?: string;
}

export interface IPixToSend {
  creditedClientId: number;
  value: number;
  pixKey: string;
  message?: string;
  status: string;
  returnMessage?: string;
} 