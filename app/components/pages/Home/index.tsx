import React, { use, useEffect, useState } from "react"
import classNames from "classnames"
import { Collapse, Row, Col, Tabs, Button, Tag, Alert, Skeleton } from "antd"
// import { useAppDispatch, useAppSelector } from "@/redux/provider"
// import { AccountSelectors } from "@/redux/account"
import * as Types from "@/types"
import * as Utils from "@/utils"
import * as UtilsTxKoios from "@/utils/txKoios"
import Informers from "@/components/informers"
import Empty from "@/components/common/Empty"
import { useAppStore } from "@/store/app"
import {
  ArrowPathIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusCircleIcon,
  PlusIcon,
  HashtagIcon,
  CircleStackIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline"
import style from "./style.module.css"
import KoiosClient from "cardano-koios-client"

type TAdddressTxs = Types.KoiosTypes.paths["/address_txs"]["post"]["responses"]["200"]["content"]["application/json"]
type TTxInfo = Types.KoiosTypes.paths["/tx_info"]["post"]["responses"]["200"]["content"]["application/json"]

export default function HomePage() {
  const network = useAppStore((state) => state.network)
  const tip = useAppStore((state) => state.tip)
  const accountState = useAppStore((state) => state.accountState)
  const [firstLoad, setFirstLoad] = useState(true)
  const [koiosClient, setKoiosClient] = useState<ReturnType<typeof KoiosClient> | null>(null)
  const [loadingList, setLoadingList] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [step, setStep] = useState(0)
  const [transactionsList, setTransactionsList] = useState<TAdddressTxs>([])
  const [transactionsInfo, setTransactionsInfo] = useState<TTxInfo>([])
  const limit = 10

  useEffect(() => {
    if (network) {
      const client = KoiosClient(`https://graph.xray.app/output/services/koios/${network}/api/v1/`)
      setKoiosClient(client)
    }
  }, [network])

  useEffect(() => {
    if (accountState && koiosClient && firstLoad) {
      refresh()
      setFirstLoad(false)
    }
  }, [accountState, koiosClient, firstLoad])

  const refresh = () => {
    setLoadingList(true)
    setStep(0)
    setTransactionsList([])
    setTransactionsInfo([])
    fetchTransactons(0, [], [])
  }

  const fetchTransactons = async (offset: number = 0, transactionsList: TAdddressTxs, transactionsInfo: TTxInfo) => {
    setLoadingMore(true)
    const txs = await koiosClient?.POST("/address_txs", {
      body: {
        _addresses: [accountState!.paymentAddress],
      },
      params: {
        query: {
          limit,
          offset,
        } as any,
      },
    })
    if (txs?.data) {
      setTransactionsList([...transactionsList, ...txs.data])
      setLoadingList(false)
      const info = await koiosClient?.POST("/tx_info", {
        body: {
          _tx_hashes: txs.data.map((tx) => tx.tx_hash!),
          _inputs: true,
          _assets: true,
        },
      })
      if (info?.data) {
        setTransactionsInfo([...transactionsInfo, ...info.data])
      }
      setLoadingMore(false)
    }
    setLoadingList(false)
  }

  return (
    <div className="max-w-256 mx-auto pt-5">
      <div className="flex items-center mb-5 ">
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
      {!accountState && (
        <Empty title="Account is not connected" descr="Please connect an account to access your information" />
      )}
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
                className={style.collapse}
                items={transactionsList.map((tx) => {
                  const block_time = tx.block_time!
                  const txInfo = transactionsInfo.find((info) => info.tx_hash === tx.tx_hash)
                  const loadingInfo = !txInfo
                  const txDetails = txInfo
                    ? UtilsTxKoios.txDetailsWithAddress(
                        accountState.paymentAddress,
                        txInfo?.inputs || [],
                        txInfo?.outputs || []
                      )
                    : undefined

                  return {
                    key: tx.tx_hash,
                    label: (
                      <div className={style.head}>
                        {loadingInfo && <div className={classNames(style.headIcon)} />}
                        {!loadingInfo && (
                          <>
                            {txDetails?.type === "send" && (
                              <div className={classNames(style.headIcon, style.headIconSend)}>
                                <ArrowUpIcon className="size-5" strokeWidth={2.5} />
                              </div>
                            )}
                            {txDetails?.type === "receive" && (
                              <div className={classNames(style.headIcon, style.headIconReceive)}>
                                <ArrowDownIcon className="size-5" strokeWidth={2.5} />
                              </div>
                            )}
                            {txDetails?.type === "internal" && (
                              <div className={classNames(style.headIcon, style.headIconInternal)}>
                                <ArrowPathIcon className="size-5" strokeWidth={2.5} />
                              </div>
                            )}
                          </>
                        )}
                        <div className={style.headInfo}>
                          <div className="text-lg">
                            {loadingInfo && (
                              <div className="inline-flex items-center">
                                <Skeleton
                                  active
                                  paragraph={{ rows: 1, width: "100%" }}
                                  title={false}
                                  className="me-5 w-20!"
                                />
                              </div>
                            )}
                            {!loadingInfo && (
                              <strong>
                                {txDetails?.type === "send" &&
                                  `Sent ADA ${txDetails.assets && txDetails.assets?.length > 0 ? "+ Assets" : ""}`}
                                {txDetails?.type === "receive" &&
                                  `Received ADA ${txDetails.assets && txDetails.assets?.length > 0 ? "+ Assets" : ""}`}
                                {txDetails?.type === "internal" && `Internal Transfer`}
                              </strong>
                            )}
                          </div>
                          <div className="text-gray-500 font-normal text-xs">
                            {new Date(block_time * 1000).toLocaleString()} ({Utils.timeAgo((tx.block_time || 0) * 1000)}
                            )
                          </div>
                        </div>
                        <div className={style.headAssets}>
                          <div>
                            {loadingInfo && (
                              <div className="inline-flex items-center">
                                <Skeleton
                                  active
                                  paragraph={{ rows: 1, width: "100%" }}
                                  title={false}
                                  className="me-5 w-20!"
                                />
                              </div>
                            )}
                            {!loadingInfo && (
                              <>
                                {txDetails?.type === "send" && (
                                  <div className="flex flex-col items-end nowrap">
                                    <Informers.Ada prefix="-" value={txDetails?.value || "0"} skipZero />
                                    <span className="flex text-gray-500 font-normal text-xs">
                                      <span className="me-1">Fee:</span>
                                      <span>
                                        <Informers.Ada prefix="-" value={txInfo?.fee || "0"} skipZero />
                                      </span>
                                    </span>
                                  </div>
                                )}
                                {txDetails?.type === "receive" && (
                                  <div className="flex flex-col items-end nowrap">
                                    <Informers.Ada prefix="+" value={txDetails?.value || "0"} skipZero />
                                    <span className="flex text-gray-500 font-normal text-xs">
                                      <span className="me-1">Fee:</span>
                                      <span>
                                        <Informers.Ada prefix="-" value={txInfo?.fee || "0"} skipZero />
                                      </span>
                                    </span>
                                  </div>
                                )}
                                {txDetails?.type === "internal" && (
                                  <span className="flex text-gray-500 font-normal text-xs">
                                    <span className="me-1">Fee:</span>
                                    <span>
                                      <Informers.Ada prefix="-" value={txInfo?.fee || "0"} skipZero />
                                    </span>
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                          {txDetails?.type !== "internal" && (
                            <div className="text-right">
                              {txDetails?.assets?.map((asset, index) => {
                                return (
                                  <div key={index} className="inline-flex ms-3">
                                    <Informers.Asset
                                      policyId={asset.policyId}
                                      assetName={asset.assetName}
                                      quantity={asset.quantity}
                                      decimals={asset.decimals}
                                      prefix={txDetails?.type === "send" ? "-" : "+"}
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                    children: (
                      <div key={tx.tx_hash}>
                        {loadingInfo && <Skeleton active paragraph={{ rows: 2 }} />}
                        {!loadingInfo && (
                          <>
                            <Row gutter={24}>
                              <Col xs={24} sm={12}>
                                <div className="flex items-center mb-2">
                                  <HashtagIcon className="size-5 me-2" strokeWidth={2} />
                                  <strong>General Info</strong>
                                </div>
                                <div className="shared-box mb-3">
                                  <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
                                    <Informers.Breakdown
                                      items={[
                                        {
                                          title: "Tx Hash",
                                          children: (
                                            <Informers.Text
                                              value={Utils.truncate(txInfo.tx_hash || "")}
                                              copy={txInfo.tx_hash || ""}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Tx Index",
                                          children: (
                                            <Informers.Text
                                              value={Utils.quantityWithCommas(txInfo.tx_block_index || "0")}
                                              copy={(txInfo.tx_block_index || "0").toString()}
                                            />
                                          ),
                                        },
                                        {
                                          title: "TTL",
                                          children: (
                                            <Informers.Text
                                              value={
                                                txInfo.invalid_after
                                                  ? new Date(
                                                      Utils.slotToUnixTime(
                                                        Number(txInfo.invalid_after || 0),
                                                        network!
                                                      ) || 0
                                                    ).toLocaleString()
                                                  : "—"
                                              }
                                              copy={
                                                txInfo.invalid_after
                                                  ? new Date(
                                                      Utils.slotToUnixTime(
                                                        Number(txInfo.invalid_after || 0),
                                                        network!
                                                      ) || 0
                                                    ).toLocaleString()
                                                  : "—"
                                              }
                                            />
                                          ),
                                        },
                                        {
                                          title: "Size (Bytes)",
                                          children: (
                                            <Informers.Text
                                              value={Utils.quantityWithCommas(txInfo.tx_size || "0")}
                                              copy={(txInfo.tx_size || "0").toString()}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Total Output",
                                          children: <Informers.Ada value={txInfo.total_output || "0"} />,
                                        },
                                        {
                                          title: "Fee",
                                          children: <Informers.Ada value={txInfo.fee || "0"} />,
                                        },
                                      ]}
                                    />
                                  </div>
                                </div>
                              </Col>
                              <Col xs={24} sm={12}>
                                <div className="flex items-center mb-2">
                                  <CircleStackIcon className="size-5 me-2" strokeWidth={2} />
                                  <strong>Block Info</strong>
                                </div>
                                <div className="shared-box mb-3">
                                  <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
                                    <Informers.Breakdown
                                      items={[
                                        {
                                          title: "Block Hash",
                                          children: (
                                            <Informers.Text
                                              value={Utils.truncate(txInfo.block_hash || "")}
                                              copy={txInfo.block_hash || ""}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Block",
                                          children: (
                                            <Informers.Text
                                              value={Utils.quantityWithCommas(txInfo.block_height || "0")}
                                              copy={(txInfo.block_height || "0").toString()}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Epoch / Slot",
                                          children: (
                                            <Informers.Text
                                              value={`${Utils.quantityWithCommas(txInfo.epoch_no || "0")} / ${Utils.quantityWithCommas(txInfo.epoch_slot || "0")}`}
                                              copy={`${txInfo.epoch_no || "0"} / ${txInfo.epoch_slot || "0"}`}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Absolute Slot",
                                          children: (
                                            <Informers.Text
                                              value={Utils.quantityWithCommas(txInfo.absolute_slot || "0")}
                                              copy={(txInfo.absolute_slot || "0").toString()}
                                            />
                                          ),
                                        },
                                        {
                                          title: "Timestamp",
                                          children: (
                                            <Informers.Text
                                              value={
                                                txInfo.tx_timestamp
                                                  ? new Date(Number(txInfo.tx_timestamp || 0) * 1000).toLocaleString()
                                                  : "—"
                                              }
                                              copy={
                                                txInfo.tx_timestamp
                                                  ? new Date(Number(txInfo.tx_timestamp || 0) * 1000).toLocaleString()
                                                  : "—"
                                              }
                                            />
                                          ),
                                        },
                                        {
                                          title: "Confirmations",
                                          children: (
                                            <Informers.Text
                                              value={
                                                <>
                                                  {(tip?.blockNo || 0) <= 3 && (
                                                    <Tag color="danger" className="font-size-12">
                                                      Low
                                                    </Tag>
                                                  )}
                                                  {(tip?.blockNo || 0) > 3 && (tip?.blockNo || 0) <= 9 && (
                                                    <Tag color="warning" className="font-size-12">
                                                      Medium
                                                    </Tag>
                                                  )}
                                                  {(tip?.blockNo || 0) > 9 && (
                                                    <Tag color="success" className="font-size-12">
                                                      High
                                                    </Tag>
                                                  )}
                                                  {Utils.quantityWithCommas(
                                                    (tip?.blockNo || 0) - (txInfo.block_height || 0)
                                                  )}{" "}
                                                </>
                                              }
                                              copy={((tip?.blockNo || 0) - (txInfo.block_height || 0)).toString()}
                                            />
                                          ),
                                        },
                                      ]}
                                    />
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Tabs
                              destroyOnHidden
                              items={[
                                {
                                  key: "utxos",
                                  label: <strong>UTXOs</strong>,
                                  children: (
                                    <div>
                                      <Row gutter={24}>
                                        <Col xs={24} sm={12}>
                                          <div className="flex items-center mb-2">
                                            <ArrowRightIcon className="size-5 me-2" strokeWidth={2} />
                                            <strong>Inputs</strong>
                                          </div>
                                          {txInfo.inputs?.map((input, index) => {
                                            return (
                                              <div key={index} className="shared-box mb-3">
                                                <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
                                                  <div>
                                                    <Informers.Explorer
                                                      type="paymentAddress"
                                                      value={input.payment_addr?.bech32 || ""}
                                                    />
                                                  </div>
                                                  <div className="text-gray-500 font-bold text-xs flex">
                                                    <span className="flex items-center me-2">
                                                      <span className="me-1">Tx:</span>
                                                      <span>
                                                        <Informers.Explorer type="tx" value={input.tx_hash || ""} />
                                                      </span>
                                                    </span>
                                                    <span>#{input.tx_index}</span>
                                                  </div>
                                                  <Informers.Breakdown
                                                    items={[
                                                      {
                                                        children: <Informers.Ada value={input.value || "0"} />,
                                                      },
                                                      ...(input.asset_list?.length
                                                        ? (input.asset_list as any[]).map((asset, index) => {
                                                            // TODO
                                                            return {
                                                              children: (
                                                                <Informers.Asset
                                                                  key={index}
                                                                  policyId={asset.policy_id || ""}
                                                                  assetName={asset.asset_name || ""}
                                                                  quantity={asset.quantity || "0"}
                                                                  decimals={asset.decimals || 0}
                                                                />
                                                              ),
                                                            }
                                                          })
                                                        : []),
                                                    ]}
                                                  />
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </Col>
                                        <Col xs={24} sm={12}>
                                          <div className="flex items-center mb-2">
                                            <strong>Outputs</strong>
                                            <ArrowRightIcon className="size-5 ms-2" strokeWidth={2} />
                                          </div>
                                          {txInfo.outputs?.map((output, index) => {
                                            return (
                                              <div key={index} className="shared-box mb-3">
                                                <div className="shared-box-inner bg-gray-100! dark:bg-gray-950!">
                                                  <div>
                                                    <Informers.Explorer
                                                      type="paymentAddress"
                                                      value={output.payment_addr?.bech32 || ""}
                                                    />
                                                  </div>
                                                  <div className="text-gray-500 font-bold text-xs flex">
                                                    <span className="flex items-center me-2">
                                                      <span className="me-1">Tx:</span>
                                                      <span>
                                                        <Informers.Explorer type="tx" value={output.tx_hash || ""} />
                                                      </span>
                                                    </span>
                                                    <span>#{output.tx_index}</span>
                                                  </div>
                                                  <Informers.Breakdown
                                                    items={[
                                                      {
                                                        children: <Informers.Ada value={output.value || "0"} />,
                                                      },
                                                      ...(output.asset_list?.length
                                                        ? (output.asset_list as any[]).map((asset, index) => {
                                                            return {
                                                              children: (
                                                                <Informers.Asset
                                                                  key={index}
                                                                  policyId={asset.policy_id || ""}
                                                                  assetName={asset.asset_name || ""}
                                                                  quantity={asset.quantity || "0"}
                                                                  decimals={asset.decimals || 0}
                                                                />
                                                              ),
                                                            }
                                                          })
                                                        : []),
                                                    ]}
                                                  />
                                                </div>
                                              </div>
                                            )
                                          })}
                                        </Col>
                                      </Row>
                                    </div>
                                  ),
                                },
                                {
                                  key: "metadata",
                                  disabled: true,
                                  label: <strong>Metadata</strong>,
                                },
                                {
                                  key: "withdrawals",
                                  disabled: true,
                                  label: <strong>Withdrawals</strong>,
                                },
                                {
                                  key: "certificates",
                                  disabled: true,
                                  label: <strong>Certificates</strong>,
                                },
                                {
                                  key: "contracts",
                                  disabled: true,
                                  label: <strong>Contracts</strong>,
                                },
                                {
                                  key: "token_mint",
                                  disabled: true,
                                  label: <strong>TokenMint</strong>,
                                },
                                {
                                  key: "collateral",
                                  disabled: true,
                                  label: <strong>Collateral</strong>,
                                },
                                {
                                  key: "reference_inputs",
                                  disabled: true,
                                  label: <strong>InputRefs</strong>,
                                },
                                {
                                  key: "raw",
                                  disabled: true,
                                  label: <strong>Raw</strong>,
                                },
                              ]}
                            />
                          </>
                        )}
                      </div>
                    ),
                  }
                })}
                expandIcon={() => null}
              />
            )}
          </div>
          {!loadingList && transactionsList.length > 0 && (
            <>
              <div className="mt-4 mb-5">
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  shape="round"
                  block
                  loading={loadingMore}
                  onClick={() => {
                    const newStep = step + 1
                    setStep(newStep)
                    fetchTransactons(newStep * limit, transactionsList, transactionsInfo)
                  }}
                >
                  <PlusIcon className="size-5" strokeWidth={2} />
                  <strong>Load More</strong>
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
