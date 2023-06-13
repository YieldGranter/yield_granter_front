import React from 'react';
import './App.css';
import { AppBar, Box, Button, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { wagmiConfig } from "./configs/wagmi";
import { WagmiConfig, useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
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

function AddProject() {
  const [open, setOpen] = React.useState(false)

  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <>
      <Button variant={'outlined'} onClick={() => setOpen(prev => !prev)}>
        {open ? 'Clear Project' : 'Add Project'}
      </Button>
      {open && (
        <Box mt={2}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              defaultValue="The best of the best project name"
            />
            <TextField
              label="Description"
              defaultValue="The best of the best project description"
            />
            <TextField
              label="Donation Goal"
              defaultValue="Where's money Lebowski?"
            />
            <Button variant={'contained'} onClick={handleSaveProject}>Save Project</Button>
          </Stack>
        </Box>
      )}
    </>
  )
}

function App() {
  return (
    <WagmiConfig config={wagmiConfig as any}>
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
      <Box p={2}>
        <AddProject />
      </Box>
    </WagmiConfig>
  );
}

export default App;
