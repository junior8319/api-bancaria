import { useContext } from "react";
import ClientsContext from "../context/Contexts.tsx";
import React from "react";

const Login = () => {
  const context = useContext(ClientsContext);
  const cpf = context?.cpf;
  const password = context?.password;
  const handleInputChange = context?.handleInputChange;
  const sendLoginRequest = context?.sendLoginRequest;

  return (
    <div>
      <h1>API de Pix</h1>
      <form>
        <p className="text-center">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" value={cpf} onChange={handleInputChange} />
        </p>

        <p className="text-center">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" value={password} onChange={handleInputChange} />
        </p>

        <p className="text-center">
          <button onClick={sendLoginRequest}>Login</button>
        </p>
      </form>
    </div>
  );
};

export default Login;
  