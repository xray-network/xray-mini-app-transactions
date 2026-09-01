import type { CardanoProviders } from "@/types"

export type AddressTransactions =
  CardanoProviders.koios.Types.paths["/address_txs"]["post"]["responses"]["200"]["content"]["application/json"]

export type TransactionInfoList =
  CardanoProviders.koios.Types.paths["/tx_info"]["post"]["responses"]["200"]["content"]["application/json"]

export type TransactionInfo = TransactionInfoList[number]
export type TransactionOutput = NonNullable<TransactionInfo["outputs"]>[number]
