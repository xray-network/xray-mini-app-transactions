import React, { useState, useEffect } from "react"
import { Dropdown, Space, Radio, Checkbox } from "antd"
import style from "./style.module.css"

const InformerDropdown = ({
  active,
  selector,
  items,
  placement = "bottomLeft",
}: {
  active?: boolean
  selector: React.ReactElement | string
  items: (
    | {
        type: "divider"
      }
    | {
        type: "title"
        children: React.ReactElement | string
      }
    | {
        type: "item"
        children: React.ReactElement | string
      }
  )[]
  placement?:
    | "bottomRight"
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "top"
    | "bottom"
    | undefined
}) => {
  return (
    <Dropdown
      arrow
      placement={placement}
      trigger={["click"]}
      popupRender={() => (
        <div className={style.dropdown}>
          {items.map((item, index) => {
            if (item.type === "divider") {
              return <div key={index} className={style.dropdownDivider} />
            }
            if (item.type === "title") {
              return (
                <div key={index} className={style.dropdownTitle}>
                  {item.children}
                </div>
              )
            }
            if (item.type === "item") {
              return (
                <div key={index} className={style.dropdownItem}>
                  {item.children}
                </div>
              )
            }
          })}
        </div>
      )}
    >
      <div className={style.dropdownSelector}>
        {active && <div className={style.dropdownSelectorActive} />}
        {selector}
      </div>
    </Dropdown>
  )
}

export default InformerDropdown
