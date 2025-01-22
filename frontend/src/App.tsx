import { useContext } from "react";
import ClientsContext from "./context/Contexts.tsx";
import React from "react";
import Login from "./components/Login.tsx";

const App = () => {
  const context = useContext(ClientsContext);
  const client = context?.client || null;
  const clients = context?.clients || [];
  const pixToSend = context?.pixToSend || null;
  const sendPixRequest = context?.sendPixRequest;
  const handlePixInputChange = context?.handlePixInputChange;
  const formatDateInBrasilia = context?.formatDateInBrasilia;
  const formatTimeInBrasilia = context?.formatTimeInBrasilia;

  const clientLogged = JSON.parse(localStorage.getItem('client') || '{}');
  const isLoggedIn = (clientLogged.token && clientLogged.token.length > 0) ? true : false;

  const clientsWithoutLoggedClient = clients.filter((person) => client && person.id !== client?.id);  
  
  return (
    (client && isLoggedIn)
    ?
      <div>
        <header>
          <div className="bg-yellow-500">
            <h1>API de Pix</h1>
            <p>Olá, { client?.name }</p>
          </div>
        </header>

        <div>
          <h2>Lista de Pix</h2>
          <div>
            <h3>Recebidos</h3>
            { client?.receivedPix?.length === 0
            ? 
              <p>Nenhum Pix recebido</p>
            :
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Enviado por:</th>
                    <th>Chave</th>
                    <th>Mensagem</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  { client?.receivedPix?.map((pix) => {
                    const payerClientName = clients.find((person) => person.id === pix.payerClientId)?.name;
                    return (
                      <tr key={pix.id}>
                        <td>{ formatDateInBrasilia ? formatDateInBrasilia(pix.createdAt) : '' }</td>
                        <td>{ formatTimeInBrasilia ? formatTimeInBrasilia(pix.createdAt) : '' }</td>
                        <td>{ payerClientName }</td>
                        <td>{ pix.pixKey }</td>
                        <td>{ pix.message }</td>
                        <td>R$ { pix.value.toFixed(2) }</td>
                      </tr>
                    );
                  }) }
                </tbody>
              </table>
            }
          </div>

          <div>
            <h3>Enviados</h3>
            { client?.paidPix?.length === 0
            ?
              <p>Nenhum Pix enviado</p>
            :
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Enviado para:</th>
                    <th>Chave</th>
                    <th>Mensagem</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  { client?.paidPix?.map((pix) => {
                    const creditedClientName = clients.find((person) => person.id === pix.creditedClientId)?.name;
                    
                    return (
                      <tr key={pix.id}>
                        <td>{ formatDateInBrasilia ? formatDateInBrasilia(pix.createdAt) : '' }</td>
                        <td>{ formatTimeInBrasilia ? formatTimeInBrasilia(pix.createdAt) : '' }</td>
                        <td>{ creditedClientName }</td>
                        <td>{ pix.pixKey }</td>
                        <td>{ pix.message }</td>
                        <td>R$ { pix.value.toFixed(2) }</td>
                      </tr>
                    );
                  }) }
                </tbody>
              </table>
            }
          </div>
        </div>

        <div>
          <h2>Transferir Pix</h2>
          <form>
            <div>
              <p>
                <label
                  htmlFor="creditedClientId"
                >
                  ID do cliente
                </label>
                <input
                  list="clientsDataList"
                  name="creditedClientId"
                  type="number"
                  id="creditedClientId"
                  value={pixToSend?.creditedClientId}
                  onChange={handlePixInputChange}
                  required
                />
                <datalist
                  id="clientsDataList"
                >
                  { clientsWithoutLoggedClient.map((person) => {
                    return (
                      <option
                        key={person.id}
                        value={person.id}
                      >
                        {person.name}
                      </option>
                    );
                  }) }
                </datalist>
              </p>    

              <p>
                <label
                  htmlFor="pixKey"
                >
                  Chave Pix
                </label>
                <input
                  type="text"
                  id="pixKey"
                  name="pixKey"
                  value={pixToSend?.pixKey}
                  onChange={handlePixInputChange}
                  required
                />
              </p>

              <p>
                <label
                  htmlFor="value"
                >
                  Valor
                </label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  value={pixToSend?.value}
                  onChange={handlePixInputChange}
                  required
                />
              </p>

              <p>
                <label
                  htmlFor="message"
                >
                  Mensagem
                </label>
                <input
                  type="text"
                  id="message"
                  name="message"
                  value={pixToSend?.message}
                  onChange={handlePixInputChange}
                  required
                />
              </p>
            </div>
            <div>
              <p>
                <button
                  onClick={sendPixRequest}
                >
                  Transferir
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    :
      <Login />
  );
}

export default App;
