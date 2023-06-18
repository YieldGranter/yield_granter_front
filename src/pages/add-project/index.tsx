import React from "react";
import {Alert, Box, Button, Stack, TextField} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import { create } from 'ipfs-http-client'
//@ts-ignore
import { Buffer } from "buffer";
import { useContractWrite } from 'wagmi'
import { ipfsStorageContract } from "../../constants";
import {ipfsClient, numberToTransactionalNumber} from "../../utils";
import {Link} from "react-router-dom";

export const AddProjectPage = () => {
  const { data, isLoading, isSuccess, isError, error, write, ...res } = useContractWrite({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'saveCID',
  })

  console.log('saveCID: ', {
    data,
    isLoading,
    isSuccess,
    write,
    ...res
  })

  const [name, setName] = React.useState<any>('')
  const [address, setAddress] = React.useState<any>('')
  const [description, setDescription] = React.useState<any>('')
  const [donationGoal, setDonationGoal] = React.useState<any>('')

  const handleSaveProject = () => {
    const jsonString = JSON.stringify({
      name,
      address,
      description,
      donationGoal: numberToTransactionalNumber(donationGoal),
      donationAmount: numberToTransactionalNumber(0)
    })

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
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="The best of the best project name"
          />
          <TextField
            label="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Your project address"
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="The best of the best project description"
          />
          <TextField
            label="Donation Goal"
            value={donationGoal}
            onChange={e => setDonationGoal(e.target.value)}
            placeholder="Where's money Lebowski?"
          />
          <Button
            variant={'outlined'}
            onClick={handleSaveProject}
          >
            Save Project
          </Button>

          {isSuccess && (
            <Box mt={1}>
              <Alert severity="success">
                You have successfully created a project
              </Alert>

              <Box mt={1}>
                <Link to={`/project/${address}`} style={{ textDecoration: "underline" }}>Project Link</Link>
              </Box>

            </Box>
          )}

          {isError && (
            <Box mt={1}>
              <Alert severity="error">
                {error?.message}
              </Alert>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  )
}
