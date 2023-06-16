import { createConfig, configureChains, Chain } from 'wagmi'
import { optimism } from '@wagmi/core/chains'
import { publicProvider } from 'wagmi/providers/public'

export const customOptimism = {
  id: 10,
  name: 'Optimism',
  network: 'optimism',
  nativeCurrency: {
    decimals: 18,
    name: 'Optimism',
    symbol: 'OP',
  },
  rpcUrls: {
    public: { http: ['https://optimism.meowrpc.com'] },
    default: { http: ['https://rpc.ankr.com/optimism'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' }, // TODO
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' }, // TODO
  },
} as Chain

const { publicClient, webSocketPublicClient } = configureChains(
  [customOptimism],
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
