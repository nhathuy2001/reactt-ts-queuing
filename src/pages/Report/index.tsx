import { ArrowIcon, DownloadIcon } from "@/components/Icons";
import Table from "@/components/Table";
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Menu } from "antd";
import type { MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames/bind";
import styles from "./Report.module.scss";
import DateRangePicker from "@/components/DateRangePicker";
import { useEffect, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { INumerical } from "@/interfaces";
import { convertTimeToString } from "@/utils";
const cx = classNames.bind(styles);

interface DataType {
    key: string;
    stt: string;
    serviceName: string;
    time: string;
    status: string;
    resource: string;
}
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
const items = [
    getItem("Tất cả", "1"),
    getItem("2040001", "2"),
    getItem("2060001", "3"),
    getItem("2050002", "4"),
];

const statusItems = [
    getItem("Tất cả", "1"),
    getItem("Đang chờ", "2"),
    getItem("Đã sử dụng", "3"),
    getItem("Bỏ qua", "4"),
];

const timeItems = [
    getItem("Tất cả", "1"),
    getItem("07:10  01/10/2021", "2"),
    getItem("07:15  01/10/2021", "3"),
    getItem("07:28  01/10/2021", "4"),
];
const sourceItems = [
    getItem("Tất cả", "1"),
    getItem("Kiosk", "2"),
    getItem("Hệ thống", "3"),
];

const columns: ColumnsType<DataType> = [
    {
        title: "Số thứ tự",
        dataIndex: "stt",
        key: "stt",
        filterDropdown: () => (
            <Menu mode="vertical" items={items} defaultSelectedKeys={["1"]} />
        ),
        filterIcon: <ArrowIcon />,
    },
    {
        title: "Tên dịch vụ",
        dataIndex: "service",
        key: "service",
        filters: [
            {
                text: "Tất cả",
                value: "Tất cả",
            },
            {
                text: "Khám tim mạch",
                value: "Khám tim mạch",
            },
            {
                text: "Khám mắt",
                value: "Khám mắt",
            },
            {
                text: "Khám tổng quát",
                value: "Khám tổng quát",
            },
        ],
        filterIcon: <ArrowIcon />,
    },
    {
        title: "Thời gian cấp",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (time: Timestamp) => (
            <span>{convertTimeToString(time.toDate())}</span>
        ),
        filterDropdown: () => (
            <Menu
                mode="vertical"
                items={timeItems}
                defaultSelectedKeys={["1"]}
            />
        ),
        filterIcon: <ArrowIcon />,
    },
    {
        title: "Tình trạng",
        dataIndex: "status",
        key: "status",
        render: (text) => {
            let classes = "status";
            switch (text) {
                case "Đang chờ":
                    classes = "status waiting";
                    break;
                case "Bỏ qua":
                    classes = "status stopped";
                    break;
                case "Đã sử dụng":
                    classes = "status used";
                    break;
            }
            return <div className={classes}>{text}</div>;
        },
        filterDropdown: () => (
            <Menu
                mode="vertical"
                items={statusItems}
                defaultSelectedKeys={["1"]}
            />
        ),
        filterIcon: <ArrowIcon />,
    },
    {
        title: "Nguồn cấp",
        dataIndex: "resource",
        key: "resource",
        filterDropdown: () => (
            <Menu
                mode="vertical"
                items={sourceItems}
                defaultSelectedKeys={["1"]}
            />
        ),
        filterIcon: <ArrowIcon />,
    },
];

function Report() {
    const [dataSource, setDataSource] = useState<INumerical[]>([]);
    useEffect(() => {
        onSnapshot(collection(db, "numerical"), (snapshot) => {
            let data: INumerical[] = [];
            snapshot.docs.map((doc) => {
                data.push({
                    _id: doc.id,
                    key: doc.id,
                    ...doc.data(),
                } as INumerical);
            });
            setDataSource(data.sort((a, b) => a.stt.localeCompare(b.stt)));
        });
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("date-picker")}>
                <span className={cx("title")}>Chọn thời gian</span>
                <DateRangePicker />
            </div>
            <div className={cx("wrap-content")}>
                <Table columns={columns} rows={dataSource} />
                <div className={cx("btn-download")}>
                    <DownloadIcon />
                    <span>Tải về</span>
                </div>
            </div>
        </div>
    );
}

export default Report;
