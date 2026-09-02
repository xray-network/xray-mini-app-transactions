import { useEffect, useState } from "react"
import classNames from "classnames"
import { Button, Collapse, Skeleton } from "antd"
import { ArrowDownIcon, ArrowPathIcon, ArrowUpIcon, PlusIcon } from "@heroicons/react/24/outline"
import { providers } from "@xray-network/xray-js/cardano"
import { cardanoV1, platformV1 } from "@xray-network/xray-js/mini-app-bridge/react"
import Empty from "@/components/common/Empty"
import Informers from "@/components/informers"
import { fullTransactionExample } from "@/examples/fullTransaction"
import { useEffectiveNetwork } from "@/integrations/xray-js/useEffectiveSettings"
import * as Utils from "@/utils"
import * as UtilsTxKoios from "@/utils/txKoios"
import TransactionDetails from "./TransactionDetails"
import type { AddressTransactions, TransactionInfoList } from "./transactionTypes"
import style from "./style.module.css"

const exampleMode = import.meta.env.MODE === "example"
const limit = 10

export default function HomePage() {
  const effectiveNetwork = useEffectiveNetwork()
  const bridgeTip = cardanoV1.useTip().data
  const bridgeAccountState = cardanoV1.useAccountState().data
  const status = platformV1.useStatus()
  const network = exampleMode ? fullTransactionExample.network : effectiveNetwork
  const tip = exampleMode ? fullTransactionExample.tip : bridgeTip
  const accountState = exampleMode ? fullTransactionExample.accountState : bridgeAccountState
  const standalone = typeof window !== "undefined" && window.parent === window
  const emptyState = status.data?.account
    ? { title: "Loading account", descr: "Cardano account data is not yet available" }
    : status.data
      ? { title: "No account selected", descr: "Select a Cardano account in XRAY App to access your information" }
      : standalone
        ? { title: "Standalone mode", descr: "Open this mini app inside XRAY App to access an account" }
        : { title: "Host unavailable", descr: "XRAY App did not respond to the platform status request" }
  const [firstLoad, setFirstLoad] = useState(!exampleMode)
  const [koiosClient, setKoiosClient] = useState<ReturnType<typeof providers.koios.Client> | null>(null)
  const [loadingList, setLoadingList] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [step, setStep] = useState(0)
  const [transactionsList, setTransactionsList] = useState<AddressTransactions>(() =>
    exampleMode ? [...fullTransactionExample.transactions] : []
  )
  const [transactionsInfo, setTransactionsInfo] = useState<TransactionInfoList>(() =>
    exampleMode ? [...fullTransactionExample.transactionInfo] : []
  )

  const fetchTransactions = async (
    offset: number,
    currentTransactions: AddressTransactions,
    currentInfo: TransactionInfoList
  ) => {
    if (exampleMode || !accountState || !koiosClient) return
    setLoadingMore(true)
    try {
      const txs = await koiosClient.POST("/address_txs", {
        body: { _addresses: [accountState.paymentAddress] },
        params: { query: { limit, offset } as never },
      })
      if (!txs.data) return
      setTransactionsList([...currentTransactions, ...txs.data])
      setLoadingList(false)
      if (txs.data.length === 0) return

      const info = await koiosClient.POST("/tx_info", {
        body: {
          _tx_hashes: txs.data.map((transaction) => transaction.tx_hash!),
          _inputs: true,
          _metadata: true,
          _assets: true,
          _withdrawals: true,
          _certs: true,
          _scripts: true,
          _bytecode: true,
          _governance: true,
        },
      })
      if (info.data) setTransactionsInfo([...currentInfo, ...info.data])
    } finally {
      setLoadingList(false)
      setLoadingMore(false)
    }
  }

  const refresh = () => {
    setStep(0)
    if (exampleMode) {
      setTransactionsList([...fullTransactionExample.transactions])
      setTransactionsInfo([...fullTransactionExample.transactionInfo])
      setLoadingList(false)
      setLoadingMore(false)
      return
    }
    setLoadingList(true)
    setTransactionsList([])
    setTransactionsInfo([])
    void fetchTransactions(0, [], [])
  }

  useEffect(() => {
    if (exampleMode) {
      setKoiosClient(null)
      return
    }
    if (network) {
      setKoiosClient(providers.koios.Client(`https://graph.xray.app/output/services/koios/${network}/api/v1/`))
    }
  }, [network])

  useEffect(() => {
    if (!exampleMode && accountState && koiosClient && firstLoad) {
      refresh()
      setFirstLoad(false)
    }
  }, [accountState, koiosClient, firstLoad])

  return (
    <div className="max-w-4xl mx-auto pt-5">
      <div className="flex items-center mb-5">
        <h4 className="mb-0 text-2xl font-black">Transactions</h4>
        {accountState && (
          <div className="ms-auto mb-0 flex items-center justify-center">
            <span className="shared-link cursor-pointer ms-3 inline-flex items-center justify-center" onClick={refresh}>
              <ArrowPathIcon className="size-5 me-1" strokeWidth={2.5} />
              Refresh
            </span>
          </div>
        )}
      </div>
      {!accountState && <Empty title={emptyState.title} descr={emptyState.descr} />}
      {accountState && (
        <div>
          <div className="pt-5">
            {loadingList && <Skeleton active paragraph={{ rows: 2 }} />}
            {!loadingList && transactionsList.length === 0 && (
              <Empty title="No Transactions found" descr="There are no transactions for this account" />
            )}
            {!loadingList && (
              <Collapse
                destroyOnHidden
                ghost
                className={style.collapseComponent}
                items={transactionsList.map((transaction) => {
                  const transactionInfo = transactionsInfo.find((info) => info.tx_hash === transaction.tx_hash)
                  const loadingInfo = !transactionInfo
                  const details = transactionInfo
                    ? UtilsTxKoios.txDetailsWithAddress(
                        accountState.paymentAddress,
                        transactionInfo.inputs || [],
                        transactionInfo.outputs || []
                      )
                    : undefined

                  return {
                    key: transaction.tx_hash,
                    label: (
                      <div className={style.head}>
                        {loadingInfo && <div className={style.headIcon} />}
                        {!loadingInfo && details?.type === "send" && (
                          <div className={classNames(style.headIcon, style.headIconSend)}>
                            <ArrowUpIcon className="size-5" strokeWidth={2.5} />
                          </div>
                        )}
                        {!loadingInfo && details?.type === "receive" && (
                          <div className={classNames(style.headIcon, style.headIconReceive)}>
                            <ArrowDownIcon className="size-5" strokeWidth={2.5} />
                          </div>
                        )}
                        {!loadingInfo && details?.type === "internal" && (
                          <div className={classNames(style.headIcon, style.headIconInternal)}>
                            <ArrowPathIcon className="size-5" strokeWidth={2.5} />
                          </div>
                        )}
                        <div className={style.headInfo}>
                          <div className="text-lg">
                            {loadingInfo ? (
                              <Skeleton
                                active
                                paragraph={{ rows: 1, width: "100%" }}
                                title={false}
                                className="me-5 w-20!"
                              />
                            ) : (
                              <strong>
                                {details?.type === "send" && `Sent ADA ${details.assets?.length ? "+ Assets" : ""}`}
                                {details?.type === "receive" &&
                                  `Received ADA ${details.assets?.length ? "+ Assets" : ""}`}
                                {details?.type === "internal" && "Internal Transfer"}
                              </strong>
                            )}
                          </div>
                          <div className="text-gray-500 font-normal text-xs">
                            {new Date((transaction.block_time || 0) * 1000).toLocaleString()} (
                            {Utils.timeAgo((transaction.block_time || 0) * 1000)})
                          </div>
                        </div>
                        <div className={style.headAssets}>
                          {loadingInfo ? (
                            <Skeleton
                              active
                              paragraph={{ rows: 1, width: "100%" }}
                              title={false}
                              className="me-5 w-20!"
                            />
                          ) : (
                            <>
                              <div className="flex flex-col items-end nowrap">
                                {details?.type === "send" && (
                                  <Informers.Ada prefix="-" value={details.value || "0"} skipZero />
                                )}
                                {details?.type === "receive" && (
                                  <Informers.Ada prefix="+" value={details.value || "0"} skipZero />
                                )}
                                <span className="flex text-gray-500 font-normal text-xs">
                                  <span className="me-1">Fee:</span>
                                  <Informers.Ada prefix="-" value={transactionInfo?.fee || "0"} skipZero />
                                </span>
                              </div>
                              {details?.type !== "internal" && details?.assets?.length ? (
                                <div className="text-right">
                                  {details.assets.map((asset, index) => (
                                    <div
                                      key={`${asset.policyId}-${asset.assetName}-${index}`}
                                      className="inline-flex ms-3"
                                    >
                                      <Informers.Asset
                                        policyId={asset.policyId}
                                        assetName={asset.assetName}
                                        quantity={asset.quantity}
                                        decimals={asset.decimals}
                                        prefix={details.type === "send" ? "-" : "+"}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </>
                          )}
                        </div>
                      </div>
                    ),
                    children: loadingInfo ? (
                      <Skeleton active paragraph={{ rows: 2 }} />
                    ) : (
                      <TransactionDetails
                        transaction={transactionInfo}
                        network={network}
                        tipBlock={tip?.blockNo || 0}
                      />
                    ),
                  }
                })}
                expandIcon={() => null}
              />
            )}
          </div>
          {!exampleMode && !loadingList && transactionsList.length > 0 && (
            <div className="mt-4 mb-5">
              <Button
                htmlType="button"
                size="large"
                type="primary"
                shape="round"
                block
                loading={loadingMore}
                onClick={() => {
                  const newStep = step + 1
                  setStep(newStep)
                  void fetchTransactions(newStep * limit, transactionsList, transactionsInfo)
                }}
              >
                <PlusIcon className="size-5" strokeWidth={2} />
                <strong>Load More</strong>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
