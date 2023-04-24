import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Image, Input, Button, notification } from "antd";
import images from "../../assets/images";
import styles from "./Login.module.scss";
import { SignIn } from "@/redux/slices/UserSlice";
import { useAppDispatch } from "@/redux/store";
import { IUser } from "@/interfaces";
import { useSelector } from "react-redux";
import { userSelectors } from "@/redux/selectors";
import { WarningIcon } from "@/components/Icons";

const cx = classNames.bind(styles);

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loading } = useSelector(userSelectors);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        document.title = "Đăng nhập";
    }, []);

    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: string
    ) => {
        payload === "userName"
            ? setUserName(e.target.value)
            : setPassword(e.target.value);
        setError("");
    };

    const handleLogin = async () => {
        if (!userName || !password) {
            notification.error({
                message: "Tên đăng nhập và mật khẩu không được bỏ trống!",
                placement: "topLeft",
            });
            return;
        }
        const user = await dispatch(SignIn({ userName, password } as IUser));
        if (user.payload) navigate("/dashboard");
        else setError("Sai mật khẩu hoặc tên đăng nhập");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-left")}>
                <div className={cx("content-left__wrap")}>
                    <img className={cx("logo")} srcSet={`${images.logo} 2x`} />
                    <div>
                        <label htmlFor={cx("user-name")}>
                            Tên đăng nhập <span className="required">*</span>
                        </label>
                        <Input
                            id={cx("user-name")}
                            value={userName}
                            onChange={(e) => handleChangeInput(e, "userName")}
                            status={error && "error"}
                            className={cx("input")}
                            spellCheck={false}
                            placeholder="Nhập vào tài khoản"
                        />
                        <label htmlFor={cx("password")}>
                            Mật khẩu <span className="required">*</span>
                        </label>
                        <Input.Password
                            id={cx("password")}
                            value={password}
                            onChange={(e) => handleChangeInput(e, "password")}
                            placeholder="Nhập vào mật khẩu"
                            status={error && "error"}
                            className={cx("input")}
                            spellCheck={false}
                        />
                        {error ? (
                            <div className={cx("error-message")}>
                                <WarningIcon />
                                <span>{error}</span>
                            </div>
                        ) : (
                            <Link
                                to={"/forgot-pass"}
                                className={cx("forgot-pass")}
                            >
                                Quên mật khẩu?
                            </Link>
                        )}
                    </div>

                    <div className="d-flex-center d-flex-column">
                        <Button
                            size={"large"}
                            className={cx("btn-login", "btn btn-primary")}
                            onClick={handleLogin}
                            loading={loading}
                        >
                            Đăng nhập
                        </Button>
                        {error && (
                            <Link
                                to={"/forgot-pass"}
                                className={cx("forgot-pass")}
                            >
                                Quên mật khẩu?
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx("content-right")}>
                <Image srcSet={`${images.group341} 2x`} preview={false} />
                <div className={cx("title")}>
                    <h2 className={cx("system")}>Hệ thống</h2>
                    <h1 className={cx("heading")}>QUẢN LÝ XẾP HÀNG</h1>
                </div>
            </div>
        </div>
    );
}

export default Login;
