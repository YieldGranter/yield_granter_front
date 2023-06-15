import React from "react";
import {Box, Button, Stack, TextField} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import { create } from 'ipfs-http-client'
import { Buffer } from "buffer";
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ipfsStorageContract } from "../../constants";

export const AddProjectPage = () => {
  const [client, setClient] = React.useState<any>()

  React.useEffect(() => {
    console.log('process.env: ', process.env)
    const projectId = process.env.REACT_APP_INFURA_PROJECT_ID
    const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

    console.log('auth: ', {
      auth,
      projectId,
      projectSecret
    })

    const client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    })

    setClient(client)
  }, [])

  // this.ipfsStorageContract.saveCID(cidV0)
  //@ts-ignore
  const { config } = usePrepareContractWrite({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'saveCID',
  })
  console.log('config: ', config)
  const { data, isLoading, isSuccess, write } = useContractWrite(config as any)
  const { address, isConnected } = useAccount()
  const handleSaveProject = () => {
    const jsonString = JSON.stringify(PROJECTS_MOCK[0])

    client.add(jsonString).then((res: any) => {
      const cidV0 = res.cid.toV0().toString()

      // TODO check it
      // @ts-ignore
      write({
        // from: address,
        args: [cidV0],
      })
      console.log('res: ', res)
      console.log('cidV0: ', cidV0)
    });
  }

  return (
    <>
      <Box mt={2}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            placeholder="The best of the best project name"
          />
          <TextField
            label="Description"
            placeholder="The best of the best project description"
          />
          <TextField
            label="Donation Goal"
            placeholder="Where's money Lebowski?"
          />
          <Button
            variant={'outlined'}
            onClick={handleSaveProject}
          >
            Save Project
          </Button>
        </Stack>
      </Box>
    </>
  )
}
