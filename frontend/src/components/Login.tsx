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
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-sm bg-slate-600 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">API de Pix</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-green-500"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-500"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div>
            <button
              onClick={sendLoginRequest}
              className="w-full px-4 py-2 text-white bg-blue-600 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-transparent hover:border-[#1ED760] hover:text-[#1ED760] transition duration-500"
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
  