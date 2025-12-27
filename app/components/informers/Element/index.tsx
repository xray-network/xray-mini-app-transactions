import React from "react"
import { Tooltip } from "antd"
import classNames from "classnames"
import style from "./style.module.css"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

const InformerElement = ({
  value,
  title,
  help,
}: {
  value: string | React.ReactNode
  title?: string
  help?: string | React.ReactNode
}) => {
  return (
    <div className={classNames(style.informer)}>
      <div className={style.body}>{value}</div>
      {title && (
        <div className={style.title}>
          {title}{" "}
          {help && (
            <Tooltip title={help}>
              <InformationCircleIcon strokeWidth={2} />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default InformerElement
