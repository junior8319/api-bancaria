type ReceivedPixData = {
  id: number,
  value: number,
  message?: string,
  status: string,
  payerClientId: number,
}

type PaidPixData = {
  id: number,
  value: number,
  message?: string,
  status: string,
  creditedClientId: number,
}

type ClientData = {
  id: number,
  name: string,
  cpf: string,
  created_at: Date,
  updated_at: Date,
  receivedPix: ReceivedPixData[],
  paidPix: PaidPixData[],
};

export type { ReceivedPixData, PaidPixData, ClientData };