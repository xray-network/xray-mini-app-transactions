import React, { useState, useEffect } from "react"
import { Tooltip } from "antd"
import style from "./style.module.css"

const InformerSwitcher = ({
  value,
  items,
  onChange,
}: {
  value: string
  items: { key: string; icon: React.ReactNode; tooltip?: string }[]
  onChange: (key: string) => void
}) => {
  return (
    <div className={style.switcher}>
      {items.map((item) => {
        return (
          <Tooltip key={item.key} title={item.tooltip}>
            <div
              key={item.key}
              className={`${style.switcherItem} ${item.key === value ? style.switcherItemActive : ""}`}
              onClick={() => onChange(item.key)}
            >
              {item.icon}
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default InformerSwitcher
