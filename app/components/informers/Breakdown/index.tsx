import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { Tooltip } from "antd"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import style from "./style.module.css"

const InformerBreakdown = ({
  items,
  compact,
}: {
  items: {
    label?: React.ReactElement | string
    title?: React.ReactElement | string
    children?: React.ReactElement | string
    help?: string
    hideDots?: boolean
  }[]
  compact?: boolean
}) => {
  return (
    <div className={classNames({ [style.compact]: compact })}>
      {items.map((item, index) => (
        <div key={index} className={style.row}>
          {item.label && <div className={style.label}>{item.label}</div>}
          <div className={style.item}>
            {item.title && (
              <div className={style.title}>
                {item.title}
                {item.help && (
                  <Tooltip title={item.help}>
                    <InformationCircleIcon className="size-4" strokeWidth={2} />
                  </Tooltip>
                )}
              </div>
            )}
            {!item.hideDots && <div className={style.dots} />}
            <div className={style.quantity}>{item.children}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InformerBreakdown
