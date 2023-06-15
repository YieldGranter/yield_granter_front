import React from "react";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {Project} from "../../feature/project";

export const Projects = () => {
  return (
    <div>
      {PROJECTS_MOCK.map(props => (
        <Project {...props} />
      ))}
    </div>
  )
}