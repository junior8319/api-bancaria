import { useContext } from "react";
import ClientsContext from "../context/Contexts.tsx";
import React from "react";
import "../styles/login.styles.css"

const Login = () => {
  const context = useContext(ClientsContext);
  const cpf = context?.cpf;
  const password = context?.password;
  const handleInputChange = context?.handleInputChange;
  const sendLoginRequest = context?.sendLoginRequest;

  return (
    <main className="container-login">
      <section className="section-login">
        <h1 className="title-login">API de Pix</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="label-login"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={handleInputChange}
              className="input-login"
            />
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="password"
              className="label-login"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="input-login"
            />
          </div>

          <div>
            <button
              onClick={sendLoginRequest}
              className="btn-login"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
  