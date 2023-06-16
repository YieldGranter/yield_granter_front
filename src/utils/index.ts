//@ts-ignore
import {Buffer} from "buffer";
import {create} from "ipfs-http-client";

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
