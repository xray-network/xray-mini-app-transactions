import { message as antdMessage, notification as antdNotification, App } from "antd"

import type { MessageInstance } from "antd/es/message/interface"
import type { NotificationInstance } from "antd/es/notification/interface"

let message: MessageInstance = antdMessage
let notification: NotificationInstance = antdNotification

function EscapeAntd() {
  const staticFunctions = App.useApp()

  message = staticFunctions.message
  notification = staticFunctions.notification

  return null
}

export { message, notification }

export default EscapeAntd
