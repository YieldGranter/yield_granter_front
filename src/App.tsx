import React from 'react';
import './App.css';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {wagmiConfig} from "./configs/wagmi";
import { WagmiConfig, useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  debugger
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <Button color={'inherit'} onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )

  return <Button color={'inherit'} onClick={() => connect()}>Connect Wallet</Button>
}

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Yield Granter
            </Typography>

            <Profile />
          </Toolbar>
        </AppBar>
      </Box>
    </WagmiConfig>
  );
}

export default App;
