import React from "react";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {ShortProject} from "./short-project";
import {ipfsClient} from "../../utils";
import {useContractRead, useContractWrite} from "wagmi";
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
  const [projects, setProjects] = React.useState<any>([])
  const { data, isLoading, isSuccess, ...res } = useContractRead({
    address: ipfsStorageContract.address as `0x${string}`,
    abi: ipfsStorageContract.ABI,
    functionName: 'getCIDs',
  })
  console.log('data: ' , {data, isLoading, isSuccess, ...res})
  React.useEffect(() => {
    if (data && !projects) {
      const getProjects = async () => {
        // TODO load donation info for each project from contract
        // const projects = await Promise.all(data.map((cid: string) => ipfsClient.cat(cid)))
        // setProjects(projects)
        // console.log('projects: ', projects)
      }

      getProjects()
    }
  }, [data])

  return (
    <div>
      {PROJECTS_MOCK.map(props => (
        <ShortProject {...props} />
      ))}
    </div>
  )
}
