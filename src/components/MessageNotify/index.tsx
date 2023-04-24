import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification";
import { ReactElement } from "react";
type MessageNotifyType = "success" | "info" | "warning" | "error";
function MessageNotify(
    type: MessageNotifyType,
    message: string | ReactElement,
    placement = "topLeft" as NotificationPlacement
) {
    return notification[type]({
        message,
        placement,
        duration: 3,
    });
}

export default MessageNotify;
