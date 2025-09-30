import React, { useState, useRef } from "react"
import { Tooltip } from "antd"
import { message } from "@/utils/escapeAntd"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"

const ExplorerLink = ({
  children,
  copy,
  tooltipMessage = "Copy to Clipboard",
  tooltipSuccess = "Copied!..",
}: {
  children: React.ReactNode
  copy: string
  tooltipMessage?: string
  tooltipSuccess?: string
}) => {
  const [copied, setCopied] = useState(false)
  const tooltip = !copied ? tooltipMessage : tooltipSuccess
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const process = () => {
    // message.success(tooltipSuccess)
    setCopied(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <CopyToClipboard text={copy} onCopy={() => process()}>
      <Tooltip title={tooltip} onOpenChange={() => setCopied(false)}>
        {children}
      </Tooltip>
    </CopyToClipboard>
  )
}

export default ExplorerLink
