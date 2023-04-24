import classNames from "classnames/bind";
import styles from "./OverView.module.scss";
import { DashboardIcon03, Monitor, ServiceIcon } from "@/components/Icons";
import Calendar from "../Calendar";
import CardOverview from "./CardOverview";
import { IOverview } from "@/interfaces";

const cx = classNames.bind(styles);

const fakeData: IOverview[] = [
    {
        name: "Thiết bị",
        percent1: 90,
        percent2: 10,
        total: "4.221",
        color: "var(--primary)",
        color2: "var(--gray-300)",
        status1: "Đang hoạt động",
        status2: "Ngưng hoạt động",
        number1: "3.799",
        number2: "422",
        icon: (
            <Monitor style={{ stroke: "var(--orange-500)", width: "14px" }} />
        ),
    },
    {
        name: "Dịch vụ",
        percent1: 76,
        percent2: 24,
        total: "276",
        color: "var(--blue-color)",
        color2: "var(--gray-300)",
        status1: "Đang hoạt động",
        status2: "Ngưng hoạt động",
        number1: "210",
        number2: "66",
        icon: (
            <ServiceIcon
                style={{ color: "var(--blue-color)", width: "14px" }}
            />
        ),
    },
    {
        name: "Cấp số",
        percent1: 86,
        percent2: 10,
        percent3: 4,
        total: "4.221",
        color: "var(--green-color)",
        color2: "var(--gray-300)",
        color3: "var(--pink-color)",
        status1: "Đã sử dụng",
        status2: "Đang chờ",
        status3: "Bỏ qua",
        number1: "3.721",
        number2: "486",
        number3: "32",
        icon: (
            <DashboardIcon03
                style={{ color: "var(--green-color)", width: "14px" }}
            />
        ),
    },
];

function OverView() {
    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("heading")}>Tổng quan</h2>
            {fakeData.map((item, index) => (
                <CardOverview data={item} key={index} />
            ))}
            <div style={{ marginTop: 16 }}>
                <Calendar />
            </div>
        </div>
    );
}

export default OverView;
