import { BackSquareIcon } from "@/components/Icons";
import { INumerical } from "@/interfaces";
import { numericalSelectors } from "@/redux/selectors";
import { fetchNumericalByCode } from "@/redux/slices/numericalSlice";
import classNames from "classnames/bind";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./NumericalOrder.module.scss";
const cx = classNames.bind(styles);
function DetailNumber() {
    const { detailNumerical } = useSelector(numericalSelectors);
    const navigate = useNavigate();

    return (
        <div className={cx("wrapper", "wrap-detail")}>
            <h1 className={cx("heading")}>Quản lý cấp số</h1>
            <div className={cx("wrap")}>
                <div className={cx("wrap-content")}>
                    <h1 className={cx("sub-heading")}>Thông tin cấp số</h1>
                    <div className={cx("content")}>
                        <div className="">
                            <span className={cx("title")}>Họ tên:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.clientName}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Nguồn cấp:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.resource}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Tên dịch vụ:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.service}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Trạng thái:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.status}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Số thứ tự:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.stt}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Số điện thoại:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.phone}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Thời gian cấp:</span>
                            <span className={cx("info")}>
                                {moment(
                                    detailNumerical?.createdAt?.toDate()
                                ).format("HH:mm - DD/MM/YYYY")}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Địa chỉ Email:</span>
                            <span className={cx("info")}>
                                {detailNumerical?.email}
                            </span>
                        </div>
                        <div className="">
                            <span className={cx("title")}>Hạn sử dụng:</span>
                            <span className={cx("info")}>
                                {moment(
                                    detailNumerical?.expired?.toDate()
                                ).format("HH:mm - DD/MM/YYYY")}
                            </span>
                        </div>
                    </div>
                </div>
                <span onClick={() => navigate(-1)} className={cx("back-btn")}>
                    <BackSquareIcon />
                    <span>Quay lại</span>
                </span>
            </div>
        </div>
    );
}

export default DetailNumber;
