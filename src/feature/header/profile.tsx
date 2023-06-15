import {useAccount, useConnect, useDisconnect} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";
import {Button} from "@mui/material";
import React from "react";
import {cropAddress} from "../../utils";

export const Profile = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {cropAddress(address as string)}
        <Button color={'inherit'} onClick={() => disconnect()}>Disconnect</Button>
      </div>
    )

  return <Button color={'inherit'} onClick={() => connect()}>Connect Wallet</Button>
}
