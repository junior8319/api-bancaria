import { ClientData, PixToSend } from "./ClientData.ts";

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
  pixToSend: PixToSend | null,
  setPixToSend: (pixToSend: PixToSend) => void,
  handlePixInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  sendPixRequest: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>,
  isLoggedIn: boolean,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
}

export type { ClientsContextType };