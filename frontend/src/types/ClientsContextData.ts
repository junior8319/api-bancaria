import { ClientData } from "./ClientData";

type ClientsContextType = {
  clients: ClientData[],
  client: ClientData | null,
  cpf: string,
  password: string
  setCpf: (cpf: string) => void,
  setPassword: (password: string) => void,
  setClients: (clients: ClientData[]) => void,
  setClient: (client: ClientData) => void,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  sendLoginRequest: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>,
  mappedClients: ClientData[],
  formatDateInBrasilia: (date: Date) => string,
  formatTimeInBrasilia: (date: Date) => string,
}

export type { ClientsContextType };