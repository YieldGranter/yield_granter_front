export const cropAddress = (address: string) =>
  `${address.substring(0, 5)}...${address.substring(address.length - 4)}`
