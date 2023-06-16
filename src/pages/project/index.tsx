import React from "react";
import {Button, Card, Grid, TextField, Typography} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";

/*async getProject(cid) {
  const resp = await this.client.cat(cid)
  let content = []
  for await (const chunk of resp) {
    content = [...content, ...chunk]
  }
  const raw = Buffer.from(content).toString('utf8')
  return JSON.parse(raw)
}*/

export const ProjectPage = () => {
  const project = PROJECTS_MOCK[0];

  React.useEffect(() => {

  }, [])

  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <div>
      <Grid container>
        <Grid item>
          <Typography variant={'h4'}>
            Great Science DAO
          </Typography>

          <Typography>
            {project.address}
          </Typography>
        </Grid>

        <Grid item>
          <Card>
            <Typography>{project.donationGoal} USDC Donation goal</Typography>
            <Typography>{project.donationAmount} USDC Received</Typography>
          </Card>
        </Grid>
      </Grid>

      <Typography variant={'h6'}>About:</Typography>
      <Typography variant={'body1'}>{project.description}</Typography>

      <Card>
        <Typography>Farming pool: Velodrom sAMM USDC/sUSD</Typography>
        <Typography>Yield distribution: 95/5</Typography>
        <Typography>Total pool size: 1000000 USDC</Typography>
        <Typography>Your deposit: 0 USDC</Typography>
        <Typography>Total profit: 0 USDC</Typography>
        <Typography>Total donation: 0 USDC</Typography>
        <Typography>Donation per month: 0 USDC</Typography>

        <div>
          <TextField placeholder={'USDC amount'} />
        </div>
        <div>
          <TextField placeholder={'sUSD amount'} />
        </div>

        <Button variant={'contained'}>Deposit</Button>
        <Button variant={'outlined'}>Claim</Button>
      </Card>
    </div>
  )
}
