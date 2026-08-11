import React, { useEffect, useRef, useState } from "react"
import { Tooltip } from "antd"

const writeClipboardText = async (text: string): Promise<boolean> => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Some embedded webviews expose the Clipboard API but reject it; use the local fallback below.
    }
  }

  if (typeof document === "undefined" || !document.body) return false

  const textarea = document.createElement("textarea")
  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
  const selection = document.getSelection()
  const previousRange = selection?.rangeCount ? selection.getRangeAt(0) : null

  textarea.value = text
  textarea.readOnly = true
  textarea.style.position = "fixed"
  textarea.style.inset = "0"
  textarea.style.opacity = "0"
  textarea.style.pointerEvents = "none"
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, text.length)

  try {
    return document.execCommand("copy")
  } catch {
    return false
  } finally {
    textarea.remove()
    if (selection && previousRange) {
      selection.removeAllRanges()
      selection.addRange(previousRange)
    }
    activeElement?.focus()
  }
}

const Copy = ({
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    []
  )

  const process = async () => {
    if (!(await writeClipboardText(copy))) return

    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  const handleClick: React.MouseEventHandler<HTMLSpanElement> = () => {
    void process()
  }

  return (
    <Tooltip title={tooltip} onOpenChange={() => setCopied(false)}>
      <span style={{ display: "inline-flex" }} onClick={handleClick}>
        {children}
      </span>
    </Tooltip>
  )
}

export default Copy
