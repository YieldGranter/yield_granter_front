import { createConfig, configureChains, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { publicProvider } from 'wagmi/providers/public'

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

console.log('wagmiConfig: ', wagmiConfig)

// export const wagmiConfig = createConfig({
//   autoConnect: true,
//   publicClient: createPublicClient({
//     chain: mainnet,
//     transport: http()
//   }),
// })
