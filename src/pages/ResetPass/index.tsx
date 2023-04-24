import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Image, Input, Button } from "antd";
import images from "../../assets/images";
import styles from "./ResetPass.module.scss";
import { useSelector } from "react-redux";
import { userSelectors } from "@/redux/selectors";
import { useAppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/slices/UserSlice";
import MessageNotify from "@/components/MessageNotify";
import { WarningIcon } from "@/components/Icons";

const cx = classNames.bind(styles);

function ResetPass() {
    const [error, setError] = useState("");
    const { userUpdate } = useSelector(userSelectors);
    const [state, setState] = useState({
        password: "",
        confirmPass: "",
    });
    const { loading } = useSelector(userSelectors);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { password, confirmPass } = state;

    useEffect(() => {
        document.title = "Đặt lại mật khẩu mới";
    }, []);

    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: string
    ) => {
        const copyState: any = { ...state };
        copyState[payload] = e.target.value;
        setState(copyState);
        setError("");
    };

    const handleResetPass = async () => {
        if (!password || !confirmPass) {
            setError("Các trường dấu * không được bỏ trống!");
            return;
        }
        if (password !== confirmPass) {
            setError("Mật khẩu nhập lại không chính xác!");
            return;
        }
        if (userUpdate._id) {
            const res = await dispatch(
                updateUser({ id: userUpdate._id, payload: { password } })
            );
            if (res.payload) {
                MessageNotify("success", "Đã đổi mật khẩu!");
                navigate("/login");
            } else
                MessageNotify("error", "Đã có lỗi xảy ra! Vui lòng thử lại!");
        } else MessageNotify("error", "Đã có lỗi xảy ra! Vui lòng thử lại!");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-left")}>
                <div className={cx("content-left__wrap")}>
                    <img className={cx("logo")} srcSet={`${images.logo} 2x`} />
                    <div className="d-flex-center d-flex-column">
                        <h3 className={cx("title")}>Đặt lại mật khẩu mới</h3>
                        <div>
                            <label htmlFor={cx("password")}>
                                Mật khẩu <span className="required">*</span>
                            </label>
                            <Input.Password
                                id={cx("password")}
                                status={error && "error"}
                                className={cx("input")}
                                value={password}
                                onChange={(e) =>
                                    handleChangeInput(e, "password")
                                }
                            />
                            <label
                                htmlFor={cx("confirm")}
                                className={cx("confirm")}
                            >
                                Nhập lại mật khẩu{" "}
                                <span className="required">*</span>
                            </label>
                            <Input.Password
                                id={cx("confirm")}
                                status={error && "error"}
                                className={cx("input")}
                                value={confirmPass}
                                onChange={(e) =>
                                    handleChangeInput(e, "confirmPass")
                                }
                            />
                        </div>
                    </div>
                    <div className={cx("error-message")}>
                        {error && (
                            <>
                                <WarningIcon />
                                {error}
                            </>
                        )}
                    </div>
                    <div className={cx("wrap-button", "d-flex-center")}>
                        <Button
                            size={"large"}
                            className={cx("btn-confirm", "btn btn-primary")}
                            onClick={handleResetPass}
                            loading={loading}
                        >
                            Xác nhận
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

export default ResetPass;
