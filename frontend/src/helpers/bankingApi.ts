import { ClientData } from "../types/ClientData";

const API_URL = process.env.REACT_APP_BASE_URL;
const API_ORIGIN = process.env.REACT_APP_BASE_URL_ORIGIN;

const requestGetClients = async () => {
  try {
    const response = await fetch(`${API_URL}/clients`);
    
    const clientsJson = await response.json();

    return clientsJson;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while fetching clients ${error}`);
  }
};

const requestGetClientById = async (clientId: number) => {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}`);
    const clientJson = await response.json();

    return clientJson;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while fetching client ${error}`);
  }
};


const requestClientRegister = async (clientData: ClientData) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (API_ORIGIN) {
      headers['Access-Control-Allow-Origin'] = API_ORIGIN;
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(clientData),
      mode: 'cors' as RequestMode,
      headers,
    };

    

    const response = await fetch(`${API_URL}/clients`, options)
    .then((response) => response.json())
    .then(data => {
      return data;
    });

    return response;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while registering client ${error}`);
  }  
}

export {
  requestGetClients,
  requestGetClientById,
  requestClientRegister,
}