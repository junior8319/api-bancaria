import { ClientData } from "./ClientData";

type ClientsContextType = {
  clients: ClientData[],
  client: ClientData | null,
  setClients: (clients: ClientData[]) => void,
  setClient: (client: ClientData) => void,
}

export type { ClientsContextType };