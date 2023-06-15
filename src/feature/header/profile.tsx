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

  const handleProfile = () => {
    if (isConnected) {
      disconnect()
      return
    }
    connect()
  }

  return (
    <Button color={'inherit'} onClick={handleProfile}>
      {isConnected ? cropAddress(address as string) : 'Connect'}
    </Button>
  )
}
