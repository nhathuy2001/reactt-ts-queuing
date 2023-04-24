import { useNavigate } from "react-router-dom";
import moment from "moment";
import Dropdown from "@/components/Dropdown";
import classNames from "classnames/bind";
import styles from "./NumericalOrder.module.scss";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/Icons";
import { useAppDispatch } from "@/redux/store";
import { fetchAllService } from "@/redux/slices/serviceSlice";
import { useSelector } from "react-redux";
import {
    numericalSelectors,
    serviceSelectors,
    userSelectors,
} from "@/redux/selectors";
import MessageNotify from "@/components/MessageNotify";
import {
    addNumerical,
    fetchSTTById,
    increaseSTT,
} from "@/redux/slices/numericalSlice";
import pathSlice from "@/redux/slices/pathSlice";
import {
    convertTimeToString,
    formatNumber,
    findTheNextDays,
    convertStringToTimestamp,
} from "@/utils";
import { IDropdown } from "@/interfaces";

const cx = classNames.bind(styles);
const _EXPIRED: number = 1;
const resource = ["Kiosk", "Hệ thống"];

function AddNewNumber() {
    const { loading } = useSelector(numericalSelectors);
    const { services } = useSelector(serviceSelectors);
    const { currentUser } = useSelector(userSelectors);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [valueSelected, setValueSelected] = useState<any>(null);
    const [prefix, setPrefix] = useState<any>({});
    const [stt, setStt] = useState("");

    const [serviceList, setServiceList] = useState<IDropdown[]>([
        {
            label: "Tất cả",
            value: "Tất cả",
        },
    ]);

    useEffect(() => {
        dispatch(fetchAllService());
        let data: IDropdown[] = [];
        let objTemp = {};
        services.forEach((service) => {
            data.push({
                label: service.serviceName,
                value: service.serviceName,
            });
            const obj = { [service.serviceName]: service.serviceCode };
            Object.assign(objTemp, obj);
        });
        setPrefix(objTemp);
        setServiceList(data);
    }, [services.length]);

    useEffect(() => {
        handleNumber();
    }, [valueSelected]);

    const handleBackPage = () => {
        dispatch(pathSlice.actions.back());
        navigate(-1);
    };

    const handleNumber = async () => {
        const res = await dispatch(fetchSTTById(prefix[valueSelected]));
        if (res.payload !== undefined) {
            const formatted = formatNumber(res.payload);
            setStt(prefix[valueSelected] + formatted);
        }
    };

    const handlePrintNumber = async () => {
        if (!valueSelected) {
            MessageNotify("error", "Bạn chưa chọn dịch vụ!", "topRight");
            return;
        }
        const res = await dispatch(
            addNumerical({
                stt,
                serviceCode: prefix[valueSelected],
                clientName: currentUser?.displayName,
                phone: currentUser?.phone,
                email: currentUser?.email,
                service: valueSelected,
                createdAt: convertStringToTimestamp(
                    convertTimeToString(moment.now(), "YYYY/MM/DD  HH:mm:ss")
                ),
                expired: convertStringToTimestamp(
                    findTheNextDays(
                        moment.now(),
                        _EXPIRED,
                        "days",
                        "YYYY/MM/DD HH:mm:ss"
                    )
                ),
                status: "Đang chờ",
                resource: resource[Math.floor(Math.random() * 2)],
            })
        );
        if (res.payload) {
            dispatch(
                increaseSTT({
                    id: prefix[valueSelected],
                    value: Number(stt.substring(3, stt.length)) + 1,
                })
            );
            setOpen(true);
        } else MessageNotify("error", "Đã có lỗi xảy ra!", "topRight");
    };

    const handleCloseModal = () => {
        setOpen(false);
        setValueSelected(null);
    };
    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Quản lý cấp số</h1>
            <div className={cx("wrap-content")}>
                <h1 className={cx("sub-heading")}>CẤP SỐ MỚI</h1>
                <h3 className={cx("selected-service")}>
                    Dịch vụ khách hàng lựa chọn
                </h3>
                <div className={cx("dropdown-service")}>
                    <Dropdown
                        options={serviceList}
                        placeholder="Chọn dịch vụ"
                        value={valueSelected}
                        onChange={(value) => setValueSelected(String(value))}
                    />
                </div>
                <div className={cx("wrap-button")}>
                    <button
                        className={cx("btn-cancel", "btn btn-outline")}
                        onClick={handleBackPage}
                    >
                        Hủy bỏ
                    </button>
                    <Button
                        loading={loading}
                        className={cx("btn-print", "btn btn-primary")}
                        onClick={handlePrintNumber}
                    >
                        In số
                    </Button>
                </div>
            </div>
            <Modal
                centered
                open={open}
                closable={false}
                onCancel={handleCloseModal}
                footer={null}
                className={cx("modal")}
            >
                <div className={cx("wrap-modal")}>
                    <span
                        className={cx("closed-btn")}
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </span>
                    <div className={cx("body-modal")}>
                        <h1 className={cx("header-title")}>
                            Số thứ tự được cấp
                        </h1>
                        <div className={cx("number")}>{stt}</div>
                        <p className={cx("selected")}>
                            DV: {valueSelected}
                            <strong> (tại quầy số 1)</strong>
                        </p>
                    </div>
                    <div className={cx("footer-modal")}>
                        <p>
                            Thời gian cấp:{" "}
                            <span className={cx("grant-time")}>
                                {convertTimeToString(moment.now())}
                            </span>
                        </p>
                        <p>
                            Hạn sử dụng:{" "}
                            <span className={cx("grant-time")}>
                                {findTheNextDays(moment.now(), _EXPIRED)}
                            </span>
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default AddNewNumber;
