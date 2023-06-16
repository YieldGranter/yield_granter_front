import React from "react";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {ShortProject} from "./short-project";
import {ipfsClient} from "../../utils";

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
  React.useEffect(() => {
    // TODO check how work wagmi writeContract in adding project
  }, [])

  return (
    <div>
      {PROJECTS_MOCK.map(props => (
        <ShortProject {...props} />
      ))}
    </div>
  )
}
