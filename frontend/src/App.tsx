import { useContext } from "react";
import ClientsContext from "./context/Contexts.tsx";
import React from "react";
import Login from "./components/Login.tsx";

const App = () => {
  const context = useContext(ClientsContext);
  const client = context?.client || null;
  const clients = context?.clients || [];
  const formatDateInBrasilia = context?.formatDateInBrasilia;
  const formatTimeInBrasilia = context?.formatTimeInBrasilia;

  const clientLogged = JSON.parse(localStorage.getItem('client') || '{}');
  const isLoggedIn = (clientLogged.token && clientLogged.token.length > 0) ? true : false;  
  
  return (
    (client && isLoggedIn)
    ?
      <div>
        <header>
          <div className="bg-yellow-500">
            <h1>API de Pix</h1>
            <p>Olá, { client.dataValues?.name }</p>
          </div>
        </header>

        <div>
          <h2>Lista de Pix</h2>
          <div>
            <h3>Recebidos</h3>
            { client.dataValues?.receivedPix?.length === 0
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
                  { client.dataValues?.receivedPix?.map((pix) => {
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
            { client.dataValues?.paidPix?.length === 0
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
                  { client.dataValues?.paidPix?.map((pix) => {
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
            <p>
              <label htmlFor="pixKey">Chave Pix</label>
              <input type="text" id="pixKey" name="pixKey" />
            </p>

            <p>
              <label htmlFor="value">Valor</label>
              <input type="number" id="value" name="value" />
            </p>

            <p>
              <label htmlFor="message">Mensagem</label>
              <input type="text" id="message" name="message" />
            </p>

            <p>
              <button>Transferir</button>
            </p>
          </form>
        </div>
      </div>
    :
      <Login />
  );
}

export default App;
