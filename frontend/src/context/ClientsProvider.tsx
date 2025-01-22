import React from "react";
import { ReactNode, useEffect, useState } from "react"
import { ClientData, PixToSend } from "../types/ClientData";
import { requestClientLogin, requestGetClientById, requestGetClients, requestSendPix, requestTestTokenIsActive } from "../helpers/bankingApi.ts";
import ClientsContext from "./Contexts.tsx";

const initialPixToSend: PixToSend = {
  creditedClientId: 0,
  value: 0,
  pixKey: '',
  message: '',
};

const ClientsProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [client, setClient] = useState<ClientData | null>(null);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [pixToSend, setPixToSend] = useState<PixToSend | null>(initialPixToSend);

  const requestGetClientsFromApi = async () => {
    const data = await requestGetClients();
    setClients(data);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'cpf') {
        setCpf(value);
      } else {
        setPassword(value);
      }
    };

  const handlePixInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPixToSend({ ...pixToSend, [name]: value });
  }

  const sendLoginRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const loginData = { cpf, password };
    const response = await requestClientLogin(loginData);
    
    if (response && response.message === 'Invalid credentials') {
      alert(response.message);
    }

    if (response && response.token) {
      setClient(response);
      localStorage.setItem('client', JSON.stringify(response));
    }
    
    return response;
  };

  const sendPixRequest = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    if (pixToSend) {
      const updatedPixtoSend = { ...pixToSend, payerClientId: client?.id };
      const response = await requestSendPix(updatedPixtoSend, client?.token || '');

      const clientDataUpdated = await requestGetClientById(client?.id || 0);
      if (clientDataUpdated) {
          const token = client?.token;
          const dataValues = clientDataUpdated;
          setClient({ ...dataValues, token });
          localStorage.setItem('client', JSON.stringify({ ...dataValues, token }));
          setPixToSend(initialPixToSend);
      }

      return response;
    }
    alert('Pix data is missing');
    return null;
  }

  const formatDateInBrasilia = (date: Date): string => {
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    return formatter.format(dateObj);
  };

  const formatTimeInBrasilia = (date: Date): string => {
    const dateObj = new Date(date);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
  
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    return formatter.format(dateObj);
  }

  useEffect(() => {
    requestGetClientsFromApi();
  }, []);

  useEffect(() => {}, [clients]);

  useEffect(() => {
    const clientLogged = JSON.parse(localStorage.getItem('client') || '{}');
    if (clientLogged.token && clientLogged.token.length > 0) {
      setClient(clientLogged);
      requestTestTokenIsActive(clientLogged.token)
      .then((response) => {
        if (response && (response.status === 401 || response.status === 400)) {
          localStorage.removeItem('client');
          setClient(null);
        }
      });
    }
    
  }, []);

  useEffect(() => {
    if (client && client.dataValues && client.dataValues.id) {
      requestGetClientById(client.dataValues?.id)
      .then((response) => {
        if (response) {
          const token = client.token;
          const dataValues = response;
          setClient({ ...dataValues, token });
          localStorage.setItem('client', JSON.stringify({ ...dataValues, token }));
        }
      });
    } else if (client && client.id) {
      requestGetClientById(client.id)
      .then((response) => {
        if (response) {
          const token = client.token;
          const dataValues = response;
          setClient({ ...dataValues, token });
          localStorage.setItem('client', JSON.stringify({ ...client, token }));
        }
      });
    }
  }, [client]);

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
    handleInputChange,
    sendLoginRequest,
    cpf,
    password,
    setCpf,
    setPassword,
    formatDateInBrasilia,
    formatTimeInBrasilia,
    pixToSend,
    setPixToSend,
    handlePixInputChange,
    sendPixRequest,
  };

  return (
    <ClientsContext.Provider value={contextValues}>
      {children}
    </ClientsContext.Provider>
  )
};

export default ClientsProvider;