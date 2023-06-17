import React from "react";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {ShortProject} from "./short-project";
import {ipfsClient} from "../../utils";
import {useContractRead} from "wagmi";
import {ipfsStorageContract} from "../../constants";

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
  const [projects, setProjects] = React.useState<any>(PROJECTS_MOCK)
  const readIpfs = useContractRead({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'getCIDs',
  }) as any
  console.log('getCIDs: ', readIpfs.data)
  React.useEffect(() => {
    if (readIpfs.data?.data?.length > 0) {
      const getProjects = async () => {
        // TODO load donation info for each project from contract
        const projects = await Promise.all(
          readIpfs.data?.data?.map((cid: string) => ipfsClient.cat(cid))
        )
        setProjects(projects)
        console.log('projects: ', projects)
      }

      getProjects()
    }
  }, [])

  return (
    <div>
      {projects.map((project: any) => (
        <ShortProject {...project} />
      ))}
    </div>
  )
}
