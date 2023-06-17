import React from "react";
import {Button, Card, Grid, TextField, Typography} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {useParams} from "react-router-dom";
import {ipfsClient} from "../../utils";
//@ts-ignore
import { Buffer } from "buffer";

export const ProjectPage = () => {
  const [project, setProject] = React.useState<any>(PROJECTS_MOCK[0])
  let { projectId } = useParams();

  projectId = 'QmRxMsceQ2CAcbyuqnkhSxiv5X9QCa1TEnWMXadJQTMUHF' // TODO remove

  React.useEffect(() => {
    const getProject = async () => {
      const generator = ipfsClient.cat(projectId as string)
      for await (let value of generator) {
        const jsonString = Buffer.from(value).toString('utf8')
        const parsedData = JSON.parse(jsonString)
        console.log('ipfsClient.cat: ', parsedData)
        setProject(parsedData)
      }
    }
    getProject()
  }, [projectId])

  const handleSaveProject = () => {
    // TODO save logic
  }

  return (
    <div>
      <Grid container justifyContent={'space-between'}>
        <Grid item>
          <Typography variant={'h4'}>
            {project.name}
          </Typography>

          <Typography>
            {project.address}
          </Typography>
        </Grid>

        <Grid item>
          <Card sx={{ padding: 2 }}>
            <div>
              <Typography variant={'h5'} component={'span' as any}>{project.donationGoal} </Typography>
              <Typography component={'span' as any}>USDC Donation goal</Typography>
            </div>

            <div>
              <Typography variant={'h5'} component={'span' as any}>{project.donationAmount} </Typography>
              <Typography component={'span' as any}>USDC Received</Typography>
            </div>
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
