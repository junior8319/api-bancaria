import { useContext } from "react";
import { ClientData } from "./types/ClientData";
import ClientsContext from "./context/Contexts.tsx";

const App = () => {
  const context = useContext(ClientsContext);
  const clients = context?.clients || [];
  
  return (
    (clients && clients.length && clients.length > 0)
    ?
      <div>
        <header>
          <div className="bg-yellow-500">
            <h1>Lista de Clientes</h1>
            <ul>
              {clients.map((client: ClientData) => (
                <li key={client.id}>
                  <p>Nome: {client.name}</p>
                  <p>CPF: {client.cpf}</p>
                  <ul>
                    {client.receivedPix.map((pix) => (
                      <li key={pix.id}>
                        <p>ID: {pix.id}</p>
                        <p>Valor: {pix.value}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>
    :
      <div>
        <header>
          <div className="bg-yellow-500">
            <h1>Lista de Clientes</h1>
            <p>Nenhum cliente encontrado</p>
          </div>
        </header>
      </div>
  );
}

export default App;
