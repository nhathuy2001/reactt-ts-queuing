import DateRangePicker from "@/components/DateRangePicker";
import Dropdown from "@/components/Dropdown";
import { AddSquare } from "@/components/Icons";
import Search from "@/components/Search";
import Table from "@/components/Table";
import config from "@/configs";
import { db } from "@/firebase";
import { INumerical } from "@/interfaces";
import { numericalSelectors, serviceSelectors } from "@/redux/selectors";
import numericalSlice, {
    fetchAllNumerical,
} from "@/redux/slices/numericalSlice";
import pathSlice from "@/redux/slices/pathSlice";
import { fetchAllService } from "@/redux/slices/serviceSlice";
import { useAppDispatch } from "@/redux/store";
import classNames from "classnames/bind";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./NumericalOrder.module.scss";
const cx = classNames.bind(styles);

type OptionType = {
    label: string;
    value: string;
};

const resources = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Kiosk",
        value: "Kiosk",
    },
    {
        label: "Hệ thống",
        value: "Hệ thống",
    },
];

const statuses = [
    {
        label: "Tất cả",
        value: "Tất cả",
    },
    {
        label: "Đang chờ",
        value: "Đang chờ",
    },
    {
        label: "Đã sử dụng",
        value: "Đã sử dụng",
    },
    {
        label: "Bỏ qua",
        value: "Bỏ qua",
    },
];

function NumericalOrder() {
    const { services } = useSelector(serviceSelectors);
    const { numericalList } = useSelector(numericalSelectors);
    const dispatch = useAppDispatch();
    const [dataSource, setDataSource] = useState<INumerical[]>([]);
    const [stateDropdown, setStateDropdown] = useState({
        selectedService: "Tất cả",
        selectedStatus: "Tất cả",
        selectedResource: "Tất cả",
    });

    const [serviceList, setServiceList] = useState([
        {
            label: "Tất cả",
            value: "Tất cả",
        },
    ]);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "clientName",
            key: "clientName",
        },
        {
            title: "Tên dịch vụ",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Thời gian cấp",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (time: Timestamp) => (
                <span>
                    {moment(time.toDate()).format("HH:mm - DD/MM/YYYY")}
                </span>
            ),
        },
        {
            title: "Hạn sử dụng",
            dataIndex: "expired",
            key: "expired",
            render: (time: Timestamp) => (
                <span>
                    {moment(time.toDate()).format("HH:mm - DD/MM/YYYY")}
                </span>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                let classes = "status";
                switch (text) {
                    case "Đang chờ":
                        classes = "status waiting";
                        break;
                    case "Đã sử dụng":
                        classes = "status used";
                        break;
                    case "Bỏ qua":
                        classes = "status stopped";
                        break;
                }
                return <div className={classes}>{text}</div>;
            },
        },
        {
            title: "Nguồn cấp",
            dataIndex: "resource",
            key: "resource",
        },
        {
            render: (record: INumerical) => (
                <Link
                    onClick={() => handleClickDetail(record)}
                    to={config.routes.detailNumber}
                    className={"btn-link"}
                >
                    Chi tiết
                </Link>
            ),
        },
    ];
    const { selectedService, selectedStatus, selectedResource } = stateDropdown;

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
        dispatch(fetchAllNumerical());
    }, []);

    useEffect(() => {
        dispatch(fetchAllService());
        let data: OptionType[] = [];
        services.forEach((service) =>
            data.push({
                label: service.serviceName,
                value: service.serviceName,
            })
        );
        setServiceList([
            {
                label: "Tất cả",
                value: "Tất cả",
            },
            ...data,
        ]);
    }, [services.length]);

    useEffect(() => {
        const all = "Tất cả";
        const service = selectedService === all ? "" : selectedService;
        const status = selectedStatus === all ? "" : selectedStatus;
        const resource = selectedResource === all ? "" : selectedResource;
        setDataSource(
            numericalList.filter(
                (item) =>
                    item.service.includes(service) &&
                    item.status.includes(status) &&
                    item.resource.includes(resource)
            )
        );
    }, [selectedService, selectedStatus, selectedResource]);

    const handleClickDetail = (record: INumerical) => {
        dispatch(numericalSlice.actions.setDetailNumerical(record));
        dispatch(
            pathSlice.actions.appendPath({
                name: "Chi tiết",
                link: "",
            })
        );
    };

    const handleSelect = (
        value: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        const copyState: any = { ...stateDropdown };
        copyState[key] = String(value);
        setStateDropdown(copyState);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Quản lý cấp số</h1>
            <div className={cx("filter")}>
                <div className={cx("filter-item")}>
                    <span className={cx("title")}>Tên dịch vụ</span>
                    <Dropdown
                        options={serviceList}
                        onChange={(value) =>
                            handleSelect(value, "selectedService")
                        }
                    />
                </div>
                <div className={cx("filter-item")}>
                    <span className={cx("title")}>Tình trạng</span>
                    <Dropdown
                        options={statuses}
                        onChange={(value) =>
                            handleSelect(value, "selectedStatus")
                        }
                    />
                </div>
                <div className={cx("filter-item")}>
                    <span className={cx("title")}>Nguồn cấp</span>
                    <Dropdown
                        options={resources}
                        onChange={(value) =>
                            handleSelect(value, "selectedResource")
                        }
                    />
                </div>
                <div className={cx("")}>
                    <span className={cx("title")}>Chọn thời gian</span>
                    <DateRangePicker />
                </div>
                <div className={cx("search-box")}>
                    <span className={cx("title")}>Từ khóa</span>
                    <Search placeholder="Nhập từ khóa" />
                </div>
            </div>
            <div className={cx("wrap-table")}>
                <Table columns={columns} rows={dataSource} />
                <Link
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Cấp số mới",
                                link: "",
                            })
                        )
                    }
                    to={config.routes.addNewNumber}
                    className={cx("btn-new")}
                >
                    <AddSquare />
                    <span>
                        Cấp <br /> số mới
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default NumericalOrder;
