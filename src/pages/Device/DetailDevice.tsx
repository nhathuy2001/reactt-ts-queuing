import { Link } from "react-router-dom";
import { EditSquare } from "@/components/Icons";
import classNames from "classnames/bind";
import styles from "./Device.module.scss";
import config from "@/configs";
import { useSelector } from "react-redux";
import { deviceSelectors } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
const cx = classNames.bind(styles);

function DetailDevice() {
    const { detailDevice } = useSelector(deviceSelectors);
    const dispatch = useAppDispatch();
    return (
        <div className={cx("wrapper", "wrap-detail")}>
            <h1 className={cx("heading")}>Quản lý thiết bị</h1>
            <div className={cx("wrap-content")}>
                <h2 className={cx("sub-heading")}>Thông tin thiết bị</h2>
                <div className={cx("wrap-info")}>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Mã thiết bị:</span>
                        <span>{detailDevice.deviceCode}</span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Loại thiết bị:</span>
                        <span>{detailDevice.deviceType}</span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Tên thiết bị:</span>
                        <span>{detailDevice.deviceName}</span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Tên đăng nhập:</span>
                        <span>{detailDevice.userName}</span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Địa chỉ IP:</span>
                        <span>{detailDevice.ipAddress}</span>
                    </div>
                    <div className={cx("info")}>
                        <span className={cx("title")}>Mật khẩu:</span>
                        <span>{detailDevice.password}</span>
                    </div>
                    <div className={cx("info", "service")}>
                        <span className={cx("title")}>Dịch vụ sử dụng:</span>
                        <p>{detailDevice.serviceUse}</p>
                    </div>
                </div>
                <Link
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Cập nhật thiết bị",
                                link: "",
                            })
                        )
                    }
                    to={config.routes.updateDevice}
                    className={cx("wrap-btn")}
                >
                    <EditSquare />
                    <span>Cập nhật thiết bị</span>
                </Link>
            </div>
        </div>
    );
}

export default DetailDevice;
