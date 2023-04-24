import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { BackSquareIcon, EditSquare } from "@/components/Icons";
import Dropdown from "@/components/Dropdown";
import Search from "@/components/Search";
import Table from "@/components/Table";
import classNames from "classnames/bind";
import styles from "./Service.module.scss";
import config from "@/configs";
import DateRangePicker from "@/components/DateRangePicker";
import { useSelector } from "react-redux";
import { numericalSelectors, serviceSelectors } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { useEffect, useState } from "react";
import { fetchNumericalByCode } from "@/redux/slices/numericalSlice";
import { INumerical } from "@/interfaces";

const cx = classNames.bind(styles);

interface DataType {
    key: string;
    stt: string;
    status: string;
    detail: string;
    update: string;
}
const columns: ColumnsType<DataType> = [
    {
        title: "Số thứ tự",
        dataIndex: "stt",
        key: "stt",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (text) => (
            <div
                className={cx(
                    "status",
                    text.toUpperCase() === "Đã hoàn thành".toUpperCase()
                        ? "active"
                        : "waiting"
                )}
            >
                <span>{text}</span>
            </div>
        ),
    },
];

const items = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Đã hoàn thành",
        value: "Đã hoàn thành",
    },
    {
        label: "Đã thực hiện",
        value: "Đã thực hiện",
    },
    {
        label: "Vắng",
        value: "Vắng",
    },
];

function DetailService() {
    const { detailService } = useSelector(serviceSelectors);
    const { numericalList } = useSelector(numericalSelectors);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [dataSource, setDataSource] = useState<INumerical[]>([]);
    const {
        serviceCode,
        serviceName,
        description,
        autoIncrement,
        prefix,
        surfix,
        reset,
    } = detailService;

    useEffect(() => {
        dispatch(fetchNumericalByCode(detailService.serviceCode));
        setDataSource(numericalList);
    }, [numericalList.length]);

    const handleBackPage = () => {
        dispatch(pathSlice.actions.back());
        navigate(-1);
    };

    return (
        <div className={cx("wrapper", "detail-service")}>
            <h1 className={cx("heading")}>Quản lý dịch vụ</h1>
            <div className={cx("d-flex", "gap-24", "relative")}>
                <div className={cx("wrap-content")}>
                    <h2 className={cx("sub-heading")}>Thông tin dịch vụ</h2>
                    <div className={cx("wrap-info")}>
                        <span className={cx("title")}>Mã dịch vụ:</span>
                        <span>{serviceCode}</span>
                    </div>
                    <div className={cx("wrap-info")}>
                        <span className={cx("title")}>Tên dịch vụ:</span>
                        <span>{serviceName}</span>
                    </div>
                    <div className={cx("wrap-info")}>
                        <span className={cx("title")}>Mô tả:</span>
                        <span>{description}</span>
                    </div>
                    <div className={cx("setting-role")}>
                        <h2 className={cx("sub-heading")}>Quy tắc cấp số</h2>
                        <div className={cx("auto-increase", "wrap-check-box")}>
                            <span className={cx("check-box", "title")}>
                                Tăng tự động từ:
                            </span>
                            {autoIncrement?.checked ? (
                                <>
                                    <Input
                                        readOnly
                                        type="number"
                                        className={cx("number-box")}
                                        value={autoIncrement?.from}
                                    />
                                    <span>đến</span>
                                    <Input
                                        readOnly
                                        type="number"
                                        className={cx("number-box")}
                                        value={autoIncrement?.to}
                                    />
                                </>
                            ) : (
                                "Không"
                            )}
                        </div>
                        <div className={cx("wrap-check-box", "title")}>
                            <span className={cx("check-box", "title")}>
                                Prefix:
                            </span>
                            {prefix?.checked ? (
                                <Input
                                    readOnly
                                    type="number"
                                    className={cx("number-box")}
                                    value={prefix?.value}
                                />
                            ) : (
                                "Không"
                            )}
                        </div>
                        <div className={cx("wrap-check-box", "title")}>
                            <span className={cx("check-box", "title")}>
                                Surfix:
                            </span>
                            {surfix?.checked ? (
                                <Input
                                    readOnly
                                    type="number"
                                    className={cx("number-box")}
                                    value={surfix?.value}
                                />
                            ) : (
                                "Không"
                            )}
                        </div>
                        <div className={cx("wrap-check-box", "title")}>
                            <span className={cx("check-box", "title")}>
                                Reset mỗi ngày: {reset ? "Có" : "Không"}
                            </span>
                        </div>
                        <span>{"Ví dụ: 201-2001"}</span>
                    </div>
                </div>
                <div className={cx("wrap-table")}>
                    <div className={cx("filter")}>
                        <div className={cx("dropdown-status")}>
                            <span className={cx("title")}>Trạng thái</span>
                            <Dropdown options={items} />
                        </div>
                        <div className={cx("date-picker")}>
                            <span className={cx("title")}>Chọn thời gian</span>
                            <DateRangePicker />
                        </div>
                        <div className={cx("search")}>
                            <span className={cx("title")}>Từ khoá</span>
                            <Search />
                        </div>
                    </div>
                    <Table columns={columns} rows={dataSource} pageSize={8} />
                </div>
                <div className={cx("wrap-btn")}>
                    <Link
                        onClick={() =>
                            dispatch(
                                pathSlice.actions.appendPath({
                                    name: "Cập nhật",
                                    link: "",
                                })
                            )
                        }
                        to={config.routes.updateService}
                        className={cx("update-btn")}
                    >
                        <EditSquare />
                        <span>Cập nhật danh sách</span>
                    </Link>
                    <span onClick={handleBackPage} className={cx("back-btn")}>
                        <BackSquareIcon />
                        <span>Quay lại</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DetailService;
