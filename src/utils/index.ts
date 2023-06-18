//@ts-ignore
import {Buffer} from "buffer";
import {create} from "ipfs-http-client";
import BN from "bignumber.js";

export const cropAddress = (address: string) =>
  `${address.substring(0, 5)}...${address.substring(address.length - 4)}`

export const ipfsClient = (() => {
  const projectId = process.env.REACT_APP_INFURA_PROJECT_ID
  const projectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET
  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

  return create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    },
  })
})()

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number)
}

export const numberToTransactionalNumber = (
  amount: number | string,
  decimals: number = 18
): string => {
  return new BN(amount, 10)
    .multipliedBy(new BN(10).pow(decimals))
    .toFixed(0);
}

export const bnToString = (bn: bigint) => {
  console.log('bn: ', bn, BigInt(0), bn === BigInt(0))
  //@ts-ignore
  if (!bn || bn === BigInt(0)) return 0

  return Number(bn?.toString()) / Math.pow(10, 18)
}
