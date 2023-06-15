import React from "react";
import {Box, Button, Stack, TextField} from "@mui/material";

export const AddProjectPage = () => {
  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <>
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
    </>
  )
}
