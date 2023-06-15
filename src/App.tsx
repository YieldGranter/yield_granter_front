import React from 'react';
import './App.css';
import { wagmiConfig } from "./configs/wagmi";
import { WagmiConfig } from 'wagmi'
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig as any}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </WagmiConfig>
  );
}

export default App;
