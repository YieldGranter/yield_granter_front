import React from "react";
import {ShortProject} from "./short-project";
import {ipfsClient} from "../../utils";
import {useContractRead} from "wagmi";
import {ipfsStorageContract} from "../../constants";
import {Buffer} from "buffer";
import {CircularProgress, Stack} from "@mui/material";

// async getAllProjects() {
//   const cids = await this.ipfsStorageContract.cids
//   let projects = []
//   for (const cid of cids) {
//     const project = await this.getProject(cid)
//     project.donatedAmount =
//       await this.donationAmountStorageContract.getDonationAmount(project.address)
//     projects.push(project)
//   }
//   return projects
// }

export const Projects = () => {
  const readIpfs = useContractRead({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'getCIDs',
  }) as any

  if (!readIpfs.data) {
    return <CircularProgress />
  }

  console.log('getCIDs: ', readIpfs.data)

  return (
    <Stack spacing={3}>
      {readIpfs.data.map((projectId: any) => (
        <ShortProject id={projectId} />
      ))}
    </Stack>
  )
}
