import React from "react"
import { Tooltip } from "antd"
import classNames from "classnames"
import style from "./style.module.css"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { SVGCompass } from "@/svg"
import Copy from "@/components/common/Copy"
import * as utils from "@/utils"
import { useEffectiveExplorer } from "@/integrations/xray-mini-app-sdk/useEffectiveSettings"
import * as Types from "@/types"

// XRAY Explorer has no public URL scheme yet, so unsupported values use CardanoScan.
const explorerNameMap: Partial<Record<Types.App.Explorer, string>> = {
  cardanoscan: "CardanoScan",
  cexplorer: "CExplorer",
  adastat: "AdaStat",
}

const explorerUrlMap: Partial<
  Record<
    Types.App.Explorer,
    { [key in "paymentAddress" | "stakingAddress" | "tx" | "pool"]: (value: string) => string }
  >
> = {
  cardanoscan: {
    paymentAddress: (value: string) => `https://cardanoscan.io/address/${value}`,
    stakingAddress: (value: string) => `https://cardanoscan.io/stakekey/${value}`,
    tx: (value: string) => `https://cardanoscan.io/transaction/${value}`,
    pool: (value: string) => `https://cardanoscan.io/pool/${value}`,
  },
  cexplorer: {
    paymentAddress: (value: string) => `https://cexplorer.io/address/${value}`,
    stakingAddress: (value: string) => `https://cexplorer.io/stake/${value}`,
    tx: (value: string) => `https://cexplorer.io/tx/${value}`,
    pool: (value: string) => `https://cexplorer.io/pools/${value}`,
  },
  adastat: {
    paymentAddress: (value: string) => `https://adastat.net/addresses/${value}`,
    stakingAddress: (value: string) => `https://adastat.net/addresses/${value}`,
    tx: (value: string) => `https://adastat.net/transactions/${value}`,
    pool: (value: string) => `https://adastat.net/pools/${value}`,
  },
}

const InformerExplorer = ({
  value,
  type,
  title,
  help,
}: {
  value: string | null | undefined
  type: "paymentAddress" | "stakingAddress" | "tx" | "pool"
  title?: string
  help?: string | React.ReactNode
}) => {
  const explorerName: Types.App.Explorer = useEffectiveExplorer()
  const explorerTitle = explorerNameMap[explorerName] ?? explorerNameMap.cardanoscan!
  const explorerUrls = explorerUrlMap[explorerName] ?? explorerUrlMap.cardanoscan!

  return (
    <div className={classNames(style.informer)}>
      <div className={style.body}>
        {value && (
          <div className="flex items-center">
            <Copy copy={value}>
              <strong className="cursor-pointer hover:opacity-75 transition-opacity duration-150">
                {utils.truncate(value)}
              </strong>
            </Copy>
            <Tooltip title={`View on ${explorerTitle}`}>
              <a
                href={explorerUrls[type](value)}
                target="_blank"
                rel="noreferrer"
                className="ms-0.5 text-gray-500 hover:opacity-75 transition-opacity duration-150"
              >
                <SVGCompass strokeWidth={2} />
              </a>
            </Tooltip>
          </div>
        )}
        {!value && <strong>—</strong>}
      </div>
      {title && (
        <div className={style.title}>
          {title}{" "}
          {help && (
            <Tooltip title={help}>
              <InformationCircleIcon className="text-gray-500" strokeWidth={2} />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default InformerExplorer
