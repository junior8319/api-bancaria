import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App.tsx';
import ClientsProvider from './context/ClientsProvider.tsx';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ClientsProvider>
      <App />
    </ClientsProvider>
  </React.StrictMode>
);