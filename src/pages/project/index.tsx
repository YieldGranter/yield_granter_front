import React from "react";
import {Project} from "../../feature/project";
import {PROJECTS_MOCK} from "../../MOCK_DATA";

export const ProjectPage = () => {
  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <>
      <Project {...PROJECTS_MOCK[0]} />
    </>
  )
}
