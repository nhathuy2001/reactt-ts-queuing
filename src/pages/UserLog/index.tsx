import DateRangePicker from "@/components/DateRangePicker";
import Search from "@/components/Search";
import Table from "@/components/Table";
import { convertTimeToString } from "@/utils";
import { DatePicker } from "antd";
import classNames from "classnames/bind";
import styles from "./UserLog.module.scss";

const cx = classNames.bind(styles);

const columns = [
    {
        title: "Tên đăng nhập",
        dataIndex: "userName",
        key: "userName",
    },
    {
        title: "Thời gian tác động",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "IP thực hiện",
        dataIndex: "ip",
        key: "ip",
    },
    {
        title: "Thao tác thực hiện",
        dataIndex: "action",
        key: "action",
    },
];

interface DataType {
    key: string;
    userName: string;
    time: string;
    ip: string;
    action: string;
}

const dataSource: DataType[] = [];
for (let i = 0; i < 20; i++) {
    dataSource.push({
        key: i + 1 + "",
        userName: "admin" + (i + 1) + "@gmail.com",
        time: convertTimeToString(new Date(), "DD/MM/YYYY HH:mm:ss"),
        ip: "192.168.1.1",
        action: "Cập nhật thông tin dịch vụ DV_01",
    });
}

function UserLog() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("filter")}>
                <div className={cx("wrap")}>
                    <span className={cx("title")}>Chọn thời gian</span>
                    <DateRangePicker />
                </div>
                <div className={cx("wrap", "search-box")}>
                    <span className={cx("title")}>Từ khoá</span>
                    <Search placeholder="Nhập từ khóa" />
                </div>
            </div>
            <div className={cx("wrap-table")}>
                <Table columns={columns} rows={dataSource} pageSize={10} />
            </div>
        </div>
    );
}

export default UserLog;
