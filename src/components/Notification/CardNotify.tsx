import classNames from "classnames/bind";
import { type } from "os";
import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

type CardNotifyProps = {
    name: string | undefined;
    time: string;
};

function CardNotify({ name, time }: CardNotifyProps) {
    return (
        <div className={cx("card-notify")}>
            <span className={cx("user-name")}>Người dùng: {name}</span>
            <span className={cx("time")}>Thời gian nhận số: {time}</span>
            <span className={cx("line")}></span>
        </div>
    );
}

export default CardNotify;
