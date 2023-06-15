import {Button, Card, Grid, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

type ProjectProps = {
  id: number;
  name: string,
  description: string;
  donationGoal: number;
  donationCurrent: number;
}
export const ShortProject = ({
  id,
  name,
  description,
  donationGoal,
  donationCurrent
}: ProjectProps) => {
  return (
    <Card>
      <Grid container justifyContent={"space-between"} p={2} alignItems={'center'}>
        <Grid item>
          <Typography>{name}</Typography>
        </Grid>
        <Grid item>
          <Typography>{description}</Typography>
        </Grid>
        <Grid item>
          <Typography>{donationCurrent}$/{donationGoal}$</Typography>
        </Grid>
        <Grid item>
          <Button variant={'contained'}>
            <Link to={`/project/${id}`}>
              Donate
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
