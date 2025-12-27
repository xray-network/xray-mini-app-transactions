import React from "react"
import { Tooltip } from "antd"
import classNames from "classnames"
import style from "./style.module.css"
import { InformationCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import Copy from "@/components/common/Copy"

const InformerText = ({
  value,
  title,
  help,
  copy,
}: {
  value: string | React.ReactNode
  title?: string
  help?: string | React.ReactNode
  copy?: string
}) => {
  return (
    <div className={classNames(style.informer)}>
      <div className={style.body}>
        <strong>{value}</strong>
        {copy && (
          <span className={style.copy}>
            <Copy copy={copy}>
              <DocumentDuplicateIcon className="text-gray-500" strokeWidth={2} />
            </Copy>
          </span>
        )}
      </div>
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

export default InformerText
