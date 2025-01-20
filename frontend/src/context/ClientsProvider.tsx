import { ReactNode, useEffect, useState } from "react"
import { ClientData } from "../types/ClientData";
import { requestGetClients } from "../helpers/bankingApi.ts";
import ClientsContext from "./Contexts.tsx";

const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [client, setClient] = useState<ClientData | null>(null);

  const requestGetClientsFromApi = async () => {
    const data = await requestGetClients();
    setClients(data);
  };

  useEffect(() => {
    requestGetClientsFromApi();
  }, []);

  useEffect(() => {}, [clients]);

  let mappedClients = (clients && clients.length && clients.length > 0)
  ?
    clients.map((client) => client)
  :
    [];

  const contextValues = {
    clients,
    client,
    setClients,
    setClient,
    mappedClients,
  };

  return (
    <ClientsContext.Provider value={contextValues}>
      {children}
    </ClientsContext.Provider>
  )
};

export default ClientsProvider;