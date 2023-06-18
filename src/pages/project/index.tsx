import React from "react";
import {Box, Button, Card, Grid, Stack, TextField, Typography} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {useParams} from "react-router-dom";
import {ipfsClient, numberToTransactionalNumber} from "../../utils";
//@ts-ignore
import { Buffer } from "buffer";
import {useAccount, useContractRead, useContractWrite} from "wagmi";
import {ipfsStorageContract, susdContract, usdcContract, yieldGranterContract} from "../../constants";
import {UsdcIcon} from "../../components/icons/usdc";
import {SusdIcon} from "../../components/icons/susd";

export const ProjectPage = () => {
  const { address } = useAccount()
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

  const [firstIncome, setFirstIncome] = React.useState('')
  const [secondIncome, setSecondIncome] = React.useState('')

  const yieldDepositWrite = useContractWrite({
    address: yieldGranterContract.address as `0x${string}`,
    abi: yieldGranterContract.ABI,
    functionName: 'depositProxy',
  })
  const yieldClaimWrite = useContractWrite({
    address: yieldGranterContract.address as `0x${string}`,
    abi: yieldGranterContract.ABI,
    functionName: 'claim',
  })
  const usdcApproveWrite = useContractWrite({
    address: usdcContract.address as `0x${string}`,
    abi: usdcContract.ABI,
    functionName: 'approve',
  })
  const usdcAllowance = useContractRead({
    address: usdcContract.address as `0x${string}`,
    abi: usdcContract.ABI,
    functionName: 'allowance',
    args: [address, yieldGranterContract.address]
  })
  const susdApproveWrite = useContractWrite({
    address: susdContract.address as `0x${string}`,
    abi: susdContract.ABI,
    functionName: 'approve',
  })
  console.log('tokens: ', {
    t1: numberToTransactionalNumber(firstIncome, 6),
    t2: numberToTransactionalNumber(secondIncome)
  })
//@ts-ignore
  console.log('  ', usdcAllowance?.data?.toString(6), typeof usdcAllowance?.data)

  const handleDeposit = async () => {
    // TODO getting approves???
    // await usdcApproveWrite.write({
    //   args: [yieldGranterContract.address, numberToTransactionalNumber(firstIncome, 6)]
    // })
    // await susdApproveWrite.write({
    //   args: [yieldGranterContract.address, numberToTransactionalNumber(secondIncome)]
    // })
    console.log('tokens: ', {
      t1: numberToTransactionalNumber(firstIncome, 6),
      t2: numberToTransactionalNumber(secondIncome),
      //@ts-ignore
      t1Allowance: firstIncome < usdcAllowance?.data?.toString(6)
    })

    yieldDepositWrite.write({
      args: [
        numberToTransactionalNumber(firstIncome, 6),
        numberToTransactionalNumber(secondIncome),
        '0x25238221BE3C80b7dDCD22CCB2Ff32cff32ecF91'.toLowerCase(), // project.address TODO
      ]
    })
    // let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
    // let provider = ethers.getDefaultProvider('ropsten')
    // let contract = new ethers.Contract(tokenAddress, abi, provider)
    // await contract.approve(accountAddress, amount)
  }

  const handleWithdraw = () => {
    // TODO withdraw
  }

  const handleClaim = () => {
    yieldClaimWrite.write()
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

      <Typography variant={'h6'}><b>About:</b></Typography>
      <Typography variant={'body1'}>{project.description}</Typography>

      <Card sx={{ padding: 2, marginTop: 4 }}>
        <Typography><b>Farming pool:</b> Velodrom sAMM USDC/sUSD</Typography>
        <Typography><b>Yield distribution:</b> 95/5</Typography>
        <Typography><b>Total pool size:</b> 1000000 USDC</Typography>
        <Typography><b>Your deposit:</b> 0 USDC</Typography>
        <Typography><b>Total profit:</b> 0 USDC</Typography>
        <Typography><b>Total donation:</b> 0 USDC</Typography>
        <Typography><b>Donation per month:</b> 0 USDC</Typography>

        <Box mt={1}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <UsdcIcon />
            <TextField
              placeholder={'USDC amount'}
              value={firstIncome}
              onChange={e => setFirstIncome(e.target.value)}
            />
          </Stack>
        </Box>
        <Box mt={1} mb={1}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <SusdIcon />
            <TextField
              placeholder={'sUSD amount'}
              value={secondIncome}
              onChange={e => setSecondIncome(e.target.value)}
            />
          </Stack>
        </Box>

        <Stack direction={'row'} spacing={1}>
            <Button variant={'contained'} onClick={handleDeposit}>Deposit</Button>

            <Button variant={'outlined'} onClick={handleClaim}>Claim</Button>
        </Stack>

      </Card>
    </div>
  )
}
