import { Button, Card, Grid, Typography } from "@mui/material";
import React from "react";

type ProjectProps = {
  name: string,
  description: string;
  donationGoal: number;
  donationCurrent: number;
}
export const Project = ({
   name,
   description,
   donationGoal,
   donationCurrent
}: ProjectProps) => {
  return (
    <Card>
      <Grid container justifyContent={"space-between"}>
        <Grid item>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography>{description}</Typography>
        </Grid>
        <Grid item>
          <Typography>{donationCurrent}/{donationGoal}</Typography>
        </Grid>
        <Grid item>
          <Button variant={'contained'}>
            Donate
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
