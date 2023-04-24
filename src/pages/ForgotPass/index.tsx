import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Image, Input, Button } from "antd";
import images from "../../assets/images";
import styles from "./ForgotPass.module.scss";
import { useAppDispatch } from "@/redux/store";
import UserSlice, { CheckEmailExists } from "@/redux/slices/UserSlice";
import { useSelector } from "react-redux";
import { userSelectors } from "@/redux/selectors";
import { WarningIcon } from "@/components/Icons";

const cx = classNames.bind(styles);

function ForgotPass() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const { loading } = useSelector(userSelectors);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Quên mật khẩu";
    }, []);

    const handleContinue = async () => {
        if (!email.trim()) {
            setError("Trường này là bắt buộc!");
            return;
        }
        const res = await dispatch(CheckEmailExists(email.trim()));
        if (res.payload) {
            dispatch(UserSlice.actions.setUserUpdate(res.payload));
            navigate("/reset-pass");
        } else setError("Email không tồn tại trên hệ thống!");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-left")}>
                <div className={cx("content-left__wrap")}>
                    <img className={cx("logo")} srcSet={`${images.logo} 2x`} />
                    <div className="d-flex-center d-flex-column">
                        <h3 className={cx("title")}>Đặt lại mật khẩu</h3>
                        <span className={cx("content")}>
                            Vui lòng nhập email để đặt lại mật khẩu của bạn{" "}
                            <span className="required">*</span>
                        </span>
                        <Input
                            status={error ? "error" : ""}
                            className={cx("input")}
                            spellCheck={false}
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx("error-message")}>
                        {error && (
                            <>
                                <WarningIcon />
                                <span>{error}</span>
                            </>
                        )}
                    </div>

                    <div className={cx("wrap-button", "d-flex-center")}>
                        <Button
                            size={"large"}
                            className={cx("btn-cancel", "btn btn-outline")}
                        >
                            <Link to={"/login"}>Hủy</Link>
                        </Button>
                        <Button
                            size={"large"}
                            className={cx("btn-continue", "btn btn-primary")}
                            onClick={handleContinue}
                            loading={loading}
                        >
                            Tiếp tục
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx("content-right")}>
                <Image srcSet={`${images.frame} 2x`} preview={false} />
            </div>
        </div>
    );
}

export default ForgotPass;
