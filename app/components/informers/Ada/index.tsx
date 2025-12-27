import React from "react"
import { Tooltip } from "antd"
import { quantityFormat, quantityWithCommas } from "@/utils"
import classNames from "classnames"
import style from "./style.module.css"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useAppStore } from "@/store/app"

const InformerAda = ({
  value,
  title,
  help,
  hideDecimals,
  shortened,
  hideable = true,
  tooltip,
  hideTooltip,
  skipZero,
  sameSize,
  prefix,
}: {
  value: string | bigint
  title?: string
  help?: string | React.ReactNode
  hideDecimals?: boolean
  shortened?: boolean
  hideable?: boolean
  tooltip?: React.ReactNode | string
  hideTooltip?: boolean
  skipZero?: boolean
  sameSize?: boolean
  prefix?: string
}) => {
  const hideBalances = useAppStore((state) => state.hideBalances)
  // const appCurrency = useAppSelector((state) => state.settings.currency)
  // const exchangeRates = useAppSelector((state) => state.network.exchangeRates)

  const { a, b, final } = quantityFormat(value, 6, skipZero)
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
        [style.sameSize]: sameSize,
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
        {hideable && hideBalances ? (
          <span>
            <span className="font-bold">****** </span>
            <strong className={style.postfix}>ADA</strong>
          </span>
        ) : (
          <>
            <span className="font-bold">
              {prefix || ""}
              {!shortened ? a : short}
            </span>
            <strong className={style.postfix}>
              {b && !hideDecimals && !shortened && <span>.{b}</span>} <strong>ADA</strong>
            </strong>
          </>
        )}
        {/* </Tooltip>
        )} */}
      </div>
      {title && (
        <div className={style.title}>
          <div>{title} </div>
          {help && (
            <div>
              <Tooltip title={help}>
                <InformationCircleIcon className="text-gray-500" strokeWidth={2} />
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InformerAda
