import * as Types from "@/types"

type Type = "send" | "receive" | "internal"
type Inputs =
  Types.KoiosTypes.paths["/tx_info"]["post"]["responses"]["200"]["content"]["application/json"][number]["inputs"]
type Outputs =
  Types.KoiosTypes.paths["/tx_info"]["post"]["responses"]["200"]["content"]["application/json"][number]["outputs"]

export const txDetailsWithAddress = (
  address: string,
  inputs: Inputs,
  outputs: Outputs
): {
  type: Type
  value: bigint | undefined
  assets:
    | {
        policyId: string
        assetName: string
        quantity: bigint
        decimals: number
      }[]
    | undefined
} => {
  const hasInputWithAnotherAddress = inputs?.some((input) => input.payment_addr?.bech32 !== address)
  const hasOutputWithAnotherAddress = outputs?.some((output) => output.payment_addr?.bech32 !== address)
  const type: Type = hasInputWithAnotherAddress ? "receive" : hasOutputWithAnotherAddress ? "send" : "internal"

  const filteredOutputs =
    type === "send"
      ? outputs?.filter((i) => i.payment_addr?.bech32 !== address)
      : type === "receive"
        ? outputs?.filter((i) => i.payment_addr?.bech32 === address)
        : outputs
  const outputValueSum = filteredOutputs?.reduce((acc, output) => acc + BigInt(output.value || 0n), 0n)
  const outputAssetsSum = filteredOutputs?.reduce(
    (acc, output) => {
      const assets = (output.asset_list || []) as any[] // TODO
      assets.forEach((asset) => {
        const index = acc.findIndex((a) => a.policyId === asset.policy_id && a.assetName === asset.asset_name)
        if (index === -1) {
          acc.push({
            policyId: asset.policy_id!,
            assetName: asset.asset_name!,
            quantity: BigInt(asset.quantity!),
            decimals: asset.decimals!,
          })
        } else {
          acc[index].quantity += BigInt(asset.quantity!)
        }
      })
      return acc
    },
    [] as {
      policyId: string
      assetName: string
      quantity: bigint
      decimals: number
    }[]
  )

  return {
    type,
    value: outputValueSum,
    assets: outputAssetsSum,
  }
}
