import { ClientData, PixToSend } from "../types/ClientData.ts";

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

const requestGetClientByCpf = async (cpf: string) => {
  try {
    const response = await fetch(`${API_URL}/clients/cpf?cpf=${cpf}`);
    const clientJson = await response.json();

    return clientJson;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while fetching client ${error}`);
  }
}
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
};

const requestClientLogin = async (loginData: { cpf: string, password: string }) => {
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
      body: JSON.stringify(loginData),
      mode: 'cors' as RequestMode,
      headers,
    };

    const response = await fetch(`${API_URL}/login`, options)
    .then((response) => response.json())
    .then(data => {
      return { ...data.dataValues, token: data.token, message: data.message };
    });

    return response;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while logging in ${error}`);
  }  
};

const requestSendPix = async (pixData: PixToSend, token: string) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    };

    if (API_ORIGIN) {
      headers['Access-Control-Allow-Origin'] = API_ORIGIN;
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(pixData),
      mode: 'cors' as RequestMode,
      headers,
    };

    const response = await fetch(`${API_URL}/pix`, options)
    .then((response) => response.json())
    .then(data => {
      return data;
    });
    
    return response;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while sending pix ${error}`);
  }
};

const requestTestTokenIsActive = async (token: string | undefined) => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token || '',
    };

    if (API_ORIGIN) {
      headers['Access-Control-Allow-Origin'] = API_ORIGIN;
    }

    const options = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers,
    };

    const response = await fetch(`${API_URL}/test-token`, options)
    .then((response) => response.json())
    .then(data => {
      return data;
    });

    return response;
  } catch (error) {
    console.error(error);
    return new Error(`An error occurred while testing token ${error}`);
  }
};

export {
  requestGetClients,
  requestGetClientById,
  requestClientRegister,
  requestClientLogin,
  requestSendPix,
  requestTestTokenIsActive,
  requestGetClientByCpf,
}