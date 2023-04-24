import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Dropdown from "@/components/Dropdown";
import { Input, notification } from "antd";
import styles from "./Device.module.scss";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { addDevice } from "@/redux/slices/deviceSlice";
import { IDevice } from "@/interfaces";

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

function AddDevice() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [state, setState] = useState({
        deviceCode: "",
        deviceName: "",
        deviceType: "",
        userName: "",
        password: "",
        ipAddress: "",
        serviceUse: "",
        statusActive: "Hoạt động",
        statusConnect: "Kết nối",
    });
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
        navigate(-1);
    };
    const handleAddDevice = async () => {
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

        const res = await dispatch(addDevice(state as IDevice));
        if (res.payload) {
            notification.success({
                message: "Đã thêm thiết bị!",
                placement: "topRight",
            });
            handleBack();
        }
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
                            onChange={(value) => handleSelect(value)}
                            options={items}
                            placeholder="Chọn loại thiết bị"
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
                            placeholder="Nhập tài khoản"
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
                        {/* <Input
                            spellCheck={false}
                            placeholder="Nhập dịch vụ sử dụng"
                            value={serviceUse}
                            onChange={(e) => handleOnChange(e, "serviceUse")}
                        /> */}
                        <Dropdown
                            className={cx("select-services")}
                            mode="multiple"
                            placeholder="Chọn dịch vụ"
                            options={options}
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
                    onClick={handleAddDevice}
                    className={cx("btn-add", "btn btn-primary")}
                >
                    Thêm thiết bị
                </button>
            </div>
        </div>
    );
}

export default AddDevice;
