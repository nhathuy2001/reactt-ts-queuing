import { userSelectors } from "@/redux/selectors";
import { convertTimeToString } from "@/utils";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import CardNotify from "./CardNotify";
import styles from "./Notification.module.scss";

const cx = classNames.bind(styles);

const data: number[] = [];
for (let i = 0; i < 10; i++) {
    data.push(i);
}

function Notification() {
    const { currentUser } = useSelector(userSelectors);
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <span>Thông báo</span>
            </header>
            <div className={cx("list-notify")}>
                {data?.map((item) => (
                    <CardNotify
                        key={item}
                        name={currentUser?.displayName}
                        time={convertTimeToString(
                            new Date(),
                            "HH:mm - DD/MM/YYYY"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

export default Notification;
