import React from "react"
import { Tooltip } from "antd"
import { quantityFormat, quantityWithCommas } from "@/utils"
import classNames from "classnames"
import * as Utils from "@/utils"
import style from "./style.module.css"

const InformerAsset = ({
  quantity,
  policyId,
  assetName,
  title,
  help,
  hideDecimals,
  shortened,
  hideable,
  tooltip,
  hideTooltip,
  skipZero,
  sameSize,
  decimals,
  prefix,
}: {
  quantity: string | bigint
  policyId: string
  assetName: string
  title?: string
  tokenName?: string
  help?: string | React.ReactNode
  hideDecimals?: boolean
  shortened?: boolean
  hideable?: boolean
  tooltip?: React.ReactNode | string
  hideTooltip?: boolean
  skipZero?: boolean
  sameSize?: boolean
  decimals?: number
  prefix?: string
}) => {
  // const hideBalance = useAppSelector((state) => state.settings.hideBalance)
  // const appCurrency = useAppSelector((state) => state.settings.currency)
  // const exchangeRates = useAppSelector((state) => state.network.exchangeRates)

  const { a, b, final } = quantityFormat(quantity, decimals, skipZero)
  const short =
    Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(
      Number(final.replaceAll(",", ""))
    ) || "0"

  // const amountUSD = amountWithCommas(
  //   ((Number(amount) / 1000000) * (exchangeRates?.cardano?.[appCurrency] || 0)).toFixed(2)
  // )

  return (
    <div
      className={classNames(style.informer, {
        [style.informerSameSize]: sameSize,
      })}
    >
      <div className={style.body}>
        {/* {hideBalance && "*****"} */}
        {/* {!hideBalance && (
          <Tooltip
            title={
              !hideTooltip &&
              (tooltip || (
                <div>
                  <div>{final} ADA</div>
                  <div>
                    {config.currencySymbols[appCurrency]} {amountUSD}
                  </div>
                </div>
              ))
            }
          > */}
        <strong>
          {prefix || ""}
          {!shortened ? a : short}
        </strong>
        <span className={style.postfix}>
          {b && !hideDecimals && !shortened && <span>.{b}</span>}{" "}
          <span>{Utils.decodeAssetName(assetName)?.assetNameFinal}</span>
        </span>
        {/* </Tooltip>
        )} */}
      </div>
      {title && (
        <div className={style.title}>
          {title}{" "}
          {help && (
            <Tooltip title={help}>
              <i className="xi xi-info" />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default InformerAsset
