import { create } from "zustand"
import type { CardanoWeb3, utils, CML } from "cardano-web3-js"
import * as Types from "@/types"

interface Web3StoreState {
  web3: CardanoWeb3 | null
  CML: typeof CML | null
  utils: typeof utils | null
  initWeb3: (network: Types.CW3Types.NetworkName) => Promise<void>
}

export const useWeb3Store = create<Web3StoreState>((set) => ({
  web3: null,
  CML: null,
  utils: null,
  initWeb3: async (network: Types.CW3Types.NetworkName) => {
    console.log("Initializing CardanoWeb3js for network:", network)
    const { CardanoWeb3, CML, utils } = await import("cardano-web3-js")
    set({
      web3: new CardanoWeb3({ network }),
      CML: CML,
      utils: utils,
    })
  },
}))
