import Dropdown from "@/components/Dropdown";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CalendarIcon,
    CheckCalendarIcon,
    MarkIcon,
    UserCallIcon,
} from "@/components/Icons";
import classNames from "classnames/bind";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./Dashboard.module.scss";
import moment from "moment";
const cx = classNames.bind(styles);

const options = [
    {
        label: "Ngày",
        value: "ngày",
    },
    {
        label: "Tuần",
        value: "tuần",
    },
    {
        label: "Tháng",
        value: "tháng",
    },
];

const series = [
    {
        name: "Số thứ tự",
        data: [2500, 4200, 4000, 3500, 3200, 4221, 3300, 4300, 3200],
    },
];

function Dashboard() {
    const [type, setType] = useState("ngày");
    const [time, setTime] = useState("Tháng " + moment().format("MM/yyyy"));
    const handleSelect = (value: React.ChangeEvent<HTMLInputElement>) => {
        String(value) === "tháng"
            ? setTime("Năm " + moment().format("yyyy"))
            : setTime("Tháng " + moment().format("MM/yyyy"));
        setType(String(value));
    };
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Biểu đồ cấp số</h1>
            <div className={cx("category")}>
                <div className={cx("category-item")}>
                    <div className={cx("top")}>
                        <div className={cx("wrap-icon")}>
                            <CalendarIcon />
                        </div>
                        <h2 className={cx("title")}>
                            Số thứ tự <br />
                            đã cấp
                        </h2>
                    </div>
                    <div className={cx("bottom")}>
                        <h1 className={cx("quantity")}>4.221</h1>
                        <div className={cx("percent")}>
                            <ArrowUpIcon /> <span>32,41%</span>
                        </div>
                    </div>
                </div>
                <div className={cx("category-item")}>
                    <div className={cx("top")}>
                        <div className={cx("wrap-icon", "used")}>
                            <CheckCalendarIcon />
                        </div>
                        <h2 className={cx("title")}>
                            Số thứ tự <br />
                            đã sử dụng
                        </h2>
                    </div>
                    <div className={cx("bottom")}>
                        <h1 className={cx("quantity")}>3.721</h1>
                        <div className={cx("percent", "reduce")}>
                            <ArrowDownIcon /> <span>32,41%</span>
                        </div>
                    </div>
                </div>
                <div className={cx("category-item")}>
                    <div className={cx("top")}>
                        <div className={cx("wrap-icon", "waiting")}>
                            <UserCallIcon />
                        </div>
                        <h2 className={cx("title")}>
                            Số thứ tự <br />
                            đang chờ
                        </h2>
                    </div>
                    <div className={cx("bottom")}>
                        <h1 className={cx("quantity")}>468</h1>
                        <div className={cx("percent")}>
                            <ArrowUpIcon /> <span>56,41%</span>
                        </div>
                    </div>
                </div>
                <div className={cx("category-item")}>
                    <div className={cx("top")}>
                        <div className={cx("wrap-icon", "skip")}>
                            <MarkIcon />
                        </div>
                        <h2 className={cx("title")}>
                            Số thứ tự <br />
                            đã bỏ qua
                        </h2>
                    </div>
                    <div className={cx("bottom")}>
                        <h1 className={cx("quantity")}>32</h1>
                        <div className={cx("percent", "reduce")}>
                            <ArrowDownIcon /> <span>22,41%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("body")}>
                <div className={cx("filter")}>
                    <div>
                        <h2 className={cx("heading-2")}>
                            Bảng thống kê theo {type}
                        </h2>
                        <span>{String(time)}</span>
                    </div>
                    <div className={cx("order-by")}>
                        <p>Xem theo</p>
                        <div className={cx("dropdown")}>
                            <Dropdown
                                options={options}
                                onChange={(value) => handleSelect(value)}
                            />
                        </div>
                    </div>
                </div>
                <ReactApexChart
                    type="area"
                    series={series}
                    height={380}
                    options={{
                        chart: {
                            type: "area",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: "smooth",
                        },
                        xaxis: {
                            type: "category",
                            categories: [
                                "01",
                                "",
                                "",
                                "13",
                                "",
                                "19",
                                "",
                                "",
                                "31",
                            ],
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard;
