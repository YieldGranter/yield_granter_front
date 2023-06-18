import React from "react";
import {Box, Button, Card, Grid, Stack, Tab, Tabs, TextField, Typography} from "@mui/material";
import {PROJECTS_MOCK} from "../../MOCK_DATA";
import {useParams} from "react-router-dom";
import {ipfsClient, numberToTransactionalNumber} from "../../utils";
//@ts-ignore
import { Buffer } from "buffer";
import {useAccount, useContractRead, useContractWrite} from "wagmi";
import {dolaContract, ipfsStorageContract, susdContract, usdcContract, yieldGranterContract} from "../../constants";
import {UsdcIcon} from "../../components/icons/usdc";
import {SusdIcon} from "../../components/icons/susd";
import {DolaIcon} from "../../components/icons/dola";

export const ProjectPage = () => {
  const [tab, setTab] = React.useState<0 | 1>(0)
  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1) => {
    setTab(newValue);
  };

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

  const [zeroIncome, setZeroIncome] = React.useState('')
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
  const yieldWithdrawWrite = useContractWrite({
    address: yieldGranterContract.address as `0x${string}`,
    abi: yieldGranterContract.ABI,
    functionName: 'withdrawProxy',
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
    args: [address, yieldGranterContract.address],
    watch: true,
  })
  const dolaAllowance = useContractRead({
    address: dolaContract.address as `0x${string}`,
    abi: dolaContract.ABI,
    functionName: 'allowance',
    args: [address, yieldGranterContract.address],
    watch: true,
  })
  const dolaApproveWrite = useContractWrite({
    address: dolaContract.address as `0x${string}`,
    abi: dolaContract.ABI,
    functionName: 'approve',
  })

  // @ts-ignore
  const isUsdcAllowed = firstIncome < usdcAllowance?.data?.toString(6)
  // @ts-ignore
  const isDolaAllowed = secondIncome < dolaAllowance?.data?.toString()

  console.log('tokens: ', {
    t1: numberToTransactionalNumber(firstIncome, 6),
    t2: numberToTransactionalNumber(secondIncome),
    //@ts-ignore
    t1Allowance: isUsdcAllowed,
    // @ts-ignore
    t2Allowance: isDolaAllowed
  })

  const handleApprove = () => {
    if (!isUsdcAllowed) {
      usdcApproveWrite.write({
        args: [yieldGranterContract.address, numberToTransactionalNumber(firstIncome, 6)]
      })
    }
    if (!isDolaAllowed) {
      dolaApproveWrite.write({
        args: [yieldGranterContract.address, numberToTransactionalNumber(secondIncome)]
      })
    }
  }

  const handleDeposit = async () => {
    yieldDepositWrite.write({
      args: [
        numberToTransactionalNumber(firstIncome, 6), // 1000,
        numberToTransactionalNumber(secondIncome), // 1313000000000000,
        '0x25238221BE3C80b7dDCD22CCB2Ff32cff32ecF91'.toLowerCase(), // project.address TODO
      ]
    })
    // let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
    // let provider = ethers.getDefaultProvider('ropsten')
    // let contract = new ethers.Contract(tokenAddress, abi, provider)
    // await contract.approve(accountAddress, amount)
  }

  const handleWithdraw = () => {
    yieldWithdrawWrite.write({
      args: [
        numberToTransactionalNumber(zeroIncome), // 1313000000000000,
        numberToTransactionalNumber(firstIncome, 6), // 1000,
        numberToTransactionalNumber(secondIncome), // 1313000000000000,
      ]
    })
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
        <Typography><b>Farming pool:</b> Velodrom sAMM USDC/DOLA</Typography>
        <Typography><b>Yield distribution:</b> 95/5</Typography>
        <Typography><b>Total pool size:</b> 1000000 USDC</Typography>
        <Typography><b>Your deposit:</b> 0 USDC</Typography>
        <Typography><b>Total profit:</b> 0 USDC</Typography>
        <Typography><b>Total donation:</b> 0 USDC</Typography>
        <Typography><b>Donation per month:</b> 0 USDC</Typography>

        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Deposit" value={0} />
          <Tab label="Withdraw" value={1} />
        </Tabs>

        {tab === 0 && (
            <>
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
                  <DolaIcon />
                  <TextField
                    placeholder={'DOLA amount'}
                    value={secondIncome}
                    onChange={e => setSecondIncome(e.target.value)}
                  />
                </Stack>
              </Box>

              <Stack direction={'row'} spacing={1}>
                {
                  (isUsdcAllowed && isDolaAllowed) ? (
                    <Button variant={'contained'} onClick={handleDeposit}>Deposit</Button>
                  ) : (
                    <Button variant={'contained'} onClick={handleApprove}>Approve</Button>
                  )
                }

                <Button variant={'outlined'} onClick={handleClaim}>Claim</Button>
              </Stack>
            </>
        )}

        {tab === 1 && (
          <>
            <Box mt={1}>
              <Stack direction={'row'} alignItems={'center'} spacing={1}>
                <UsdcIcon />
                <DolaIcon style={{ marginLeft: '-20px' }} />
                <TextField
                  placeholder={'LP Token amount'}
                  value={zeroIncome}
                  onChange={e => setZeroIncome(e.target.value)}
                />
              </Stack>
            </Box>
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
                <DolaIcon />
                <TextField
                  placeholder={'DOLA amount'}
                  value={secondIncome}
                  onChange={e => setSecondIncome(e.target.value)}
                />
              </Stack>
            </Box>

            <Stack direction={'row'} spacing={1}>
              <Button variant={'outlined'} onClick={handleWithdraw}>
                Withdraw
              </Button>
            </Stack>
          </>
        )}

      </Card>
    </div>
  )
}
