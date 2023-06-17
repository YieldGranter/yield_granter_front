import React from "react";
import {Box, Button, Stack, TextField} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import { create } from 'ipfs-http-client'
//@ts-ignore
import { Buffer } from "buffer";
import { useContractWrite } from 'wagmi'
import { ipfsStorageContract } from "../../constants";
import {ipfsClient} from "../../utils";

export const AddProjectPage = () => {
  // const [client, setClient] = React.useState<any>()
  //
  // React.useEffect(() => {
  //   const projectId = process.env.REACT_APP_INFURA_PROJECT_ID
  //   const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET
  //   const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
  //
  //   const client = create({
  //     host: 'ipfs.infura.io',
  //     port: 5001,
  //     protocol: 'https',
  //     headers: {
  //       authorization: auth,
  //     },
  //   })
  //
  //   setClient(client)
  // }, [])

  const { data, isLoading, isSuccess, write, ...res } = useContractWrite({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'saveCID',
  })

  const handleSaveProject = () => {
    const jsonString = JSON.stringify(PROJECTS_MOCK[0])

    ipfsClient.add(jsonString).then((res: any) => {
      const cidV0 = res.cid.toV0().toString()

      console.log('hash: ', cidV0)

      write({
        args: [cidV0],
      })
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
