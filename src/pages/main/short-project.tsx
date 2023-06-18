import {Button, Card, CircularProgress, Grid, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";
import {bnToString, formatNumber, ipfsClient} from "../../utils";
import {Buffer} from "buffer";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {useContractRead} from "wagmi";
import {yieldGranterContract} from "../../constants";

type ProjectProps = {
  id: number;
  // name: string,
  // description: string;
  // donationGoal: number;
  // donationAmount: number;
}

export const ShortProject = ({
  id,
}: ProjectProps) => {
  const [project, setProject] = React.useState<any>()

  React.useEffect(() => {
    const getProject = async () => {
      const generator = ipfsClient.cat(String(id))
      for await (let value of generator) {
        const jsonString = Buffer.from(value).toString('utf8')
        const parsedData = JSON.parse(jsonString)
        console.log(`Project ${id}: `, parsedData)
        setProject(parsedData)
      }
    }
    getProject()
  }, [id])

  const yieldContractGetDonated = useContractRead({
    address: yieldGranterContract.address as `0x${string}`,
    abi: yieldGranterContract.ABI,
    functionName: 'getDonatedAmount',
    args: [project?.address],
    watch: true,
  })
console.log('yieldContractGetDonated: ', yieldContractGetDonated)
  if (!project) {
    return <CircularProgress />
  }
  // @ts-ignore
  const donationAmount = bnToString(yieldContractGetDonated?.data)
console.log('donationAmount: ', donationAmount)
  return (
    <Card>
      <Grid container justifyContent={"space-between"} p={2} alignItems={'center'}>
        <Grid item xs={2}>
          <Typography>{project.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{project.description}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            $ {donationAmount} / $ {bnToString(project.donationGoal)}
          </Typography>
        </Grid>
        <Grid item xs={2}>
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
