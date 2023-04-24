import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { AddSquare } from "@/components/Icons";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import Table from "@/components/Table";
import classNames from "classnames/bind";
import styles from "./Device.module.scss";
import Tippy from "@tippyjs/react/headless";
import config from "@/configs";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deviceSelectors } from "@/redux/selectors";
import { IDevice } from "@/interfaces";
import deviceSlice, { fetchAllDevice } from "@/redux/slices/deviceSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
const cx = classNames.bind(styles);

const statusActive = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Hoạt động",
        value: "Hoạt động",
    },
    {
        label: "Ngưng hoạt động",
        value: "Ngưng hoạt động",
    },
];
const statusConnect = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Kết nối",
        value: "Kết nối",
    },
    {
        label: "Mất kết nối",
        value: "Mất kết nối",
    },
];

function Device() {
    const dispatch = useAppDispatch();
    const { devices, loading } = useSelector(deviceSelectors);
    const [dataSource, setDataSource] = useState<IDevice[]>([]);
    const [active, setActive] = useState("Tất cả");
    const [connect, setConnect] = useState("Tất cả");
    const [columns] = useState([
        {
            title: "Mã thiết bị",
            dataIndex: "deviceCode",
            key: "deviceCode",
        },
        {
            title: "Tên thiết bị",
            dataIndex: "deviceName",
            key: "deviceName",
        },
        {
            title: "Địa chỉ IP",
            dataIndex: "ipAddress",
            key: "ipAddress",
        },
        {
            title: "Trạng thái hoạt động",
            dataIndex: "statusActive",
            key: "statusActive",
            render: (text: string) => (
                <div
                    className={cx(
                        text.toUpperCase() === "Hoạt động".toUpperCase()
                            ? "active"
                            : "stopped",
                        "status"
                    )}
                >
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Trạng thái kết nối",
            dataIndex: "statusConnect",
            key: "statusConnect",
            render: (text: string) => (
                <div
                    className={cx(
                        text.toUpperCase() === "Kết nối".toUpperCase()
                            ? "active"
                            : "stopped",
                        "status"
                    )}
                >
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: "Dịch vụ sử dụng",
            dataIndex: "serviceUse",
            key: "serviceUse",
            render: (text: string) => (
                <div className={cx("col-service")}>
                    <p className={cx("content-service")}>{text}</p>
                    <Tippy
                        placement="bottom"
                        offset={[0, 0]}
                        render={(attrs) => (
                            <div
                                className={cx("view-more")}
                                tabIndex={-1}
                                {...attrs}
                            >
                                {text}
                            </div>
                        )}
                        trigger={"click"}
                    >
                        <button className="btn-link">Xem thêm</button>
                    </Tippy>
                </div>
            ),
        },
        {
            render: (record: IDevice) => (
                <Link
                    to={config.routes.detailDevice}
                    onClick={() => {
                        dispatch(deviceSlice.actions.setDetailDevice(record));
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Chi tiết thiết bị",
                                link: "",
                            })
                        );
                    }}
                    className="btn-link"
                >
                    Chi tiết
                </Link>
            ),
        },
        {
            render: (record: IDevice) => (
                <Link
                    onClick={() => {
                        dispatch(deviceSlice.actions.setDetailDevice(record));
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Cập nhật thiết bị",
                                link: "",
                            })
                        );
                    }}
                    to={config.routes.updateDevice}
                    className="btn-link"
                >
                    Cập nhật
                </Link>
            ),
        },
    ]);

    useEffect(() => {
        onSnapshot(collection(db, "devices"), (snapshot) => {
            let data: IDevice[] = [];
            snapshot.docs.map((doc) => {
                data.push({
                    _id: doc.id,
                    key: doc.id,
                    ...doc.data(),
                } as IDevice);
            });
            setDataSource(
                data.sort((a, b) => a.deviceName.localeCompare(b.deviceName))
            );
        });
        dispatch(fetchAllDevice());
    }, []);

    useEffect(() => {
        if (active === "Tất cả" && connect === "Tất cả") {
            setDataSource(devices);
            return;
        }

        if (active !== "Tất cả" && connect === "Tất cả") {
            setDataSource(
                devices.filter((item: IDevice) => item.statusActive === active)
            );
            return;
        }
        if (active === "Tất cả" && connect !== "Tất cả") {
            setDataSource(
                devices.filter(
                    (item: IDevice) => item.statusConnect === connect
                )
            );
            return;
        }
        setDataSource(
            devices.filter(
                (item: IDevice) =>
                    item.statusActive === active &&
                    item.statusConnect === connect
            )
        );
    }, [active, connect]);

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Danh sách thiết bị</h1>
            <div className={cx("filter")}>
                <div className={cx("dropdown-wrap")}>
                    <div className={cx("dropdown")}>
                        <span className={cx("title")}>
                            Trạng thái hoạt động
                        </span>
                        <Dropdown
                            options={statusActive}
                            onChange={(value) => setActive(String(value))}
                        />
                    </div>
                    <div className={cx("dropdown")}>
                        <span className={cx("title")}>Trạng thái kết nối</span>
                        <Dropdown
                            options={statusConnect}
                            onChange={(value) => setConnect(String(value))}
                        />
                    </div>
                </div>
                <div className={cx("search-wrap")}>
                    <span className={cx("title")}>Từ khoá</span>
                    <Search placeholder="Nhập từ khóa" />
                </div>
            </div>
            <div className={cx("wrap-table")}>
                <Table columns={columns} rows={dataSource} loading={loading} />
                <Link
                    to={config.routes.addDevice}
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Thêm thiết bị",
                                Link: config.routes.addDevice,
                            })
                        )
                    }
                    className={cx("wrap-btn")}
                >
                    <AddSquare />
                    <span>Thêm thiết bị</span>
                </Link>
            </div>
        </div>
    );
}

export default Device;
