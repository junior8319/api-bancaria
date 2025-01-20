import { createContext } from 'react';
import { ClientsContextType } from '../types/ClientsContextData';

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export default ClientsContext;