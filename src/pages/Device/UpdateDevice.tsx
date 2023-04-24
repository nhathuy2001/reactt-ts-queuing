import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Dropdown from "@/components/Dropdown";
import { Input, notification } from "antd";
import styles from "./Device.module.scss";
import { useSelector } from "react-redux";
import { deviceSelectors } from "@/redux/selectors";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { updateDevice } from "@/redux/slices/deviceSlice";

const cx = classNames.bind(styles);
const items = [
    {
        label: "Kiosk",
        value: "Kiosk",
    },
    {
        label: "Display counter",
        value: "Display counter",
    },
];
const options = [
    { label: "Khám tim mạch", value: "Khám tim mạch" },
    { label: "Khám sản phụ khoa", value: "Khám sản phụ khoa" },
    { label: "Khám răng hàm mặt", value: "Khám răng hàm mặt" },
    { label: "Khám tai mũi họng", value: "Khám tai mũi họng" },
    { label: "Khám hô hấp", value: "Khám hô hấp" },
    { label: "Khám tổng quát", value: "Khám tổng quát" },
];

function UpdateDevice() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { detailDevice } = useSelector(deviceSelectors);
    const [state, setState] = useState(detailDevice);
    const {
        deviceCode,
        deviceName,
        deviceType,
        userName,
        password,
        ipAddress,
        serviceUse,
        statusActive,
        statusConnect,
    } = state;
    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: string
    ) => {
        const copyState: any = { ...state };
        copyState[payload] = e.target.value;
        setState(copyState);
    };

    const handleSelect = (value: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            deviceType: String(value),
        });
    };
    const handleSelectService = (
        value: React.ChangeEvent<HTMLInputElement>
    ) => {
        const text = value.toString().replaceAll(",", ", ");
        setState({
            ...state,
            serviceUse: text,
        });
    };

    const handleBack = () => {
        dispatch(pathSlice.actions.back());
        navigate("/device");
    };

    const handleUpdateDevice = () => {
        if (
            !deviceCode ||
            !deviceName ||
            !deviceType ||
            !userName ||
            !password ||
            !ipAddress ||
            !serviceUse
        ) {
            notification.error({
                message: (
                    <p>
                        Các trường dấu <span className="required">*</span> là
                        trường thông tin bắt buộc
                    </p>
                ),
                placement: "topRight",
            });
            return;
        }

        dispatch(updateDevice({ id: detailDevice._id, payload: state }));
        notification.success({
            message: "Đã cập nhật thiết bị",
            placement: "topRight",
        });
        handleBack();
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Quản lý thiết bị</h1>
            <div className={cx("wrap-content")}>
                <h2 className={cx("sub-heading")}>Thông tin thiết bị</h2>
                <div className={cx("wrap-info")}>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Mã thiết bị:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Input
                            placeholder="Nhập mã thiết bị"
                            value={deviceCode}
                            onChange={(e) => handleOnChange(e, "deviceCode")}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Loại thiết bị:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Dropdown
                            options={items}
                            placeholder="Chọn loại thiết bị"
                            value={deviceType}
                            onChange={(value) => handleSelect(value)}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Tên thiết bị:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Input
                            placeholder="Nhập tên thiết bị"
                            value={deviceName}
                            onChange={(e) => handleOnChange(e, "deviceName")}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Tên đăng nhập:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Input
                            placeholder="Nhập tên đăng nhập"
                            value={userName}
                            onChange={(e) => handleOnChange(e, "userName")}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Địa chỉ IP:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Input
                            placeholder="Nhập địa chỉ IP"
                            value={ipAddress}
                            onChange={(e) => handleOnChange(e, "ipAddress")}
                        />
                    </div>
                    <div className={cx("info")}>
                        <div className={cx("title")}>
                            <span>Mật khẩu:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Input.Password
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => handleOnChange(e, "password")}
                        />
                    </div>
                    <div className={cx("info", "service")}>
                        <div className={cx("title")}>
                            <span>Dịch vụ sử dụng:</span>
                            <span className={cx("required")}>*</span>
                        </div>
                        <Dropdown
                            className={cx("select-services")}
                            mode="multiple"
                            placeholder="Chọn dịch vụ sử dụng"
                            options={options}
                            value={serviceUse ? serviceUse?.split(",") : []}
                            onChange={(value) => handleSelectService(value)}
                        />
                    </div>
                </div>
                <div className={cx("note")}>
                    <span className={cx("required")}>*</span>
                    <span className={cx("text")}>
                        Là trường thông tin bắt buộc
                    </span>
                </div>
            </div>
            <div className={cx("wrap-button")}>
                <button
                    onClick={handleBack}
                    className={cx("btn-cancel", "btn btn-outline")}
                >
                    Hủy bỏ
                </button>
                <button
                    onClick={handleUpdateDevice}
                    className={cx("btn-add", "btn btn-primary")}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
}

export default UpdateDevice;
