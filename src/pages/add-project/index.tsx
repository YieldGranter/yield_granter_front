import React from "react";
import {Box, Button, Stack, TextField} from "@mui/material";
import {Project} from "../../feature/project";
import {PROJECTS_MOCK} from "../../MOCK_DATA";

export const AddProjectPage = () => {
  const [open, setOpen] = React.useState(false)

  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <>
      <Project {...PROJECTS_MOCK[0]} />

      <Button variant={'outlined'} onClick={() => setOpen(prev => !prev)}>
        {open ? 'Clear Project' : 'Add Project'}
      </Button>
      {open && (
        <Box mt={2}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              defaultValue="The best of the best project name"
            />            <TextField
            label="Description"
            defaultValue="The best of the best project description"
          />
            <TextField
              label="Donation Goal"
              defaultValue="Where's money Lebowski?"
            />
            <Button variant={'outlined'} onClick={handleSaveProject}>Save Project</Button>
          </Stack>
        </Box>
      )}
    </>
  )
}
