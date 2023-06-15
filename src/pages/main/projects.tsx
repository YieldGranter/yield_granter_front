import React from "react";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {ShortProject} from "./short-project";

export const Projects = () => {
  return (
    <div>
      {PROJECTS_MOCK.map(props => (
        <ShortProject {...props} />
      ))}
    </div>
  )
}