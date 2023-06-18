//@ts-ignore
import {Buffer} from "buffer";
import {create} from "ipfs-http-client";
import BigNumber from "bignumber.js";

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

export function numberToTransactionalNumber(
  amount: number | string,
  decimals: number = 18
): string {
  return new BigNumber(amount, 10)
    .multipliedBy(new BigNumber(10).pow(decimals))
    .toFixed(0);
}
