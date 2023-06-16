import React from 'react';
import './App.css';
import { wagmiConfig } from "./configs/wagmi";
import { WagmiConfig } from 'wagmi'
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

const App = () => {
  const theme = {
    // palette: {
    //   primary: {
    //     main: '#5CA67F',
    //   }
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig config={wagmiConfig as any}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
