import { Link } from "react-router-dom";
import { AddSquare } from "@/components/Icons";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import Table from "@/components/Table";
import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import config from "@/configs";
import { useSelector } from "react-redux";
import { serviceSelectors } from "@/redux/selectors";
import { IService } from "@/interfaces";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import serviceSlice, { fetchAllService } from "@/redux/slices/serviceSlice";
import pathSlice from "@/redux/slices/pathSlice";
import DateRangePicker from "@/components/DateRangePicker";
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

function Service() {
    const { loading } = useSelector(serviceSelectors);
    const dispatch = useAppDispatch();
    const [dataSource, setDataSource] = useState<IService[]>([]);
    const columns = [
        {
            title: "Mã dịch vụ",
            dataIndex: "serviceCode",
            key: "serviceCode",
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "serviceName",
            key: "serviceName",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Trạng thái hoạt động",
            dataIndex: "status",
            key: "status",
            render: (text: string) => (
                <div
                    className={cx(
                        "status",
                        text.toUpperCase() === "Hoạt động".toUpperCase()
                            ? "active"
                            : "stopped"
                    )}
                >
                    <span>{text}</span>
                </div>
            ),
        },
        {
            render: (record: IService) => (
                <Link
                    onClick={() => handleClickDetail(record)}
                    to={config.routes.detailService}
                    className="btn-link"
                >
                    Chi tiết
                </Link>
            ),
        },
        {
            render: (record: IService) => (
                <Link
                    onClick={() => handleClickUpdate(record)}
                    to={config.routes.updateService}
                    className="btn-link"
                >
                    Cập nhật
                </Link>
            ),
        },
    ];

    useEffect(() => {
        onSnapshot(collection(db, "services"), (snapshot) => {
            let data: IService[] = [];
            snapshot.docs.map((doc) => {
                data.push({
                    _id: doc.id,
                    key: doc.id,
                    ...doc.data(),
                } as IService);
            });
            setDataSource(
                data.sort((a, b) => a.serviceCode.localeCompare(b.serviceCode))
            );
        });
        dispatch(fetchAllService());
    }, []);

    const handleClickDetail = (record: IService) => {
        dispatch(serviceSlice.actions.setDetailService(record));
        dispatch(
            pathSlice.actions.appendPath({
                name: "Chi tiết",
                link: "",
            })
        );
    };

    const handleClickUpdate = (record: IService) => {
        dispatch(serviceSlice.actions.setDetailService(record));
        dispatch(
            pathSlice.actions.appendPath({
                name: "Cập nhật",
                link: "",
            })
        );
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Quản lý dịch vụ</h1>
            <div className={cx("filter")}>
                <div className={cx("dropdown-wrap")}>
                    <div className={cx("dropdown")}>
                        <span className={cx("title")}>
                            Trạng thái hoạt động
                        </span>
                        <Dropdown options={statusActive} />
                    </div>
                    <div className={cx("dropdown")}>
                        <span className={cx("title")}>Chọn thời gian</span>
                        <DateRangePicker />
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
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Thêm dịch vụ",
                                link: "",
                            })
                        )
                    }
                    to={config.routes.addService}
                    className={cx("wrap-btn")}
                >
                    <AddSquare />
                    <span>Thêm dịch vụ</span>
                </Link>
            </div>
        </div>
    );
}

export default Service;
