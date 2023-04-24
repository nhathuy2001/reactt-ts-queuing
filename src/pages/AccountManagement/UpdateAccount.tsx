import Dropdown from "@/components/Dropdown";
import { IUser } from "@/interfaces";
import { userSelectors } from "@/redux/selectors";
import pathSlice from "@/redux/slices/pathSlice";
import { updateUser } from "@/redux/slices/UserSlice";
import { useAppDispatch } from "@/redux/store";
import { Button, Input, notification } from "antd";
import classNames from "classnames/bind";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./AccountManagement.module.scss";

const cx = classNames.bind(styles);

const roles = [
    {
        label: "Kế toán",
        value: "Kế toán",
    },
    {
        label: "Quản lý",
        value: "Quản lý",
    },
    {
        label: "Admin",
        value: "Admin",
    },
];
const statuses = [
    {
        label: "Hoạt động",
        value: "Hoạt động",
    },
    {
        label: "Ngừng hoạt động",
        value: "Ngừng hoạt động",
    },
];

interface IUserUpdateProps extends IUser {
    confirmPass?: string;
}

function UpdateAccount() {
    const dispatch = useAppDispatch();
    const { loading, userUpdate } = useSelector(userSelectors);
    const [state, setState] = useState<IUserUpdateProps>(
        userUpdate as IUserUpdateProps
    );
    const { userName, displayName, password, email, phone, role, status } =
        state;
    const [confirmPass, setConfirmPass] = useState(password);
    const navigate = useNavigate();
    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        payload: string
    ) => {
        const copyState: any = { ...state };
        copyState[payload] = e.target.value;
        setState(copyState);
    };
    const handleSelect = (
        value: React.ChangeEvent<HTMLInputElement>,
        payload: string
    ) => {
        const copyState: any = { ...state };
        copyState[payload] = value;
        setState(copyState);
    };

    const handleUpdate = async () => {
        if (
            !displayName ||
            !userName ||
            !phone ||
            !password ||
            !confirmPass ||
            !email ||
            !role ||
            !status
        ) {
            notification.error({
                message: (
                    <div>
                        Các trường có dấu <span className="required">*</span> là
                        bắt buộc!
                    </div>
                ),
                placement: "topLeft",
            });
            return;
        }

        if (password !== confirmPass) {
            notification.error({
                message: "Mật khẩu nhập lại không chính xác!",
                placement: "topLeft",
            });
            return;
        }
        const payload = {
            userName,
            displayName,
            password,
            email,
            phone,
            role,
            status,
        };
        await dispatch(updateUser({ id: userUpdate._id, payload }));
        notification.success({
            message: "Cập nhật tài khoản thành công!",
            placement: "topRight",
        });
        dispatch(pathSlice.actions.back());
        navigate(-1);
    };

    const handleBack = () => {
        dispatch(pathSlice.actions.back());
        navigate(-1);
    };

    return (
        <div className={cx("wrapper-add-account")}>
            <h1 className={cx("heading")}>Quản lý tài khoản</h1>
            <div className={cx("body")}>
                <h2 className={cx("sub-heading")}>Thông tin tài khoản</h2>
                <div className={cx("wrap-content")}>
                    <div>
                        <p className={cx("title")}>
                            Họ tên <span className={cx("required")}>*</span>
                        </p>
                        <Input
                            spellCheck={false}
                            placeholder="Nhập họ tên"
                            value={displayName}
                            onChange={(e) =>
                                handleChangeInput(e, "displayName")
                            }
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Tên đăng nhập{" "}
                            <span className={cx("required")}>*</span>
                        </p>
                        <Input
                            spellCheck={false}
                            placeholder="Nhập tên đăng nhập"
                            value={userName}
                            onChange={(e) => handleChangeInput(e, "userName")}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Số điện thoại{" "}
                            <span className={cx("required")}>*</span>
                        </p>
                        <Input
                            spellCheck={false}
                            placeholder="Nhập số điện thoại"
                            maxLength={11}
                            type="number"
                            value={phone}
                            onChange={(e) => handleChangeInput(e, "phone")}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Mật khẩu <span className={cx("required")}>*</span>
                        </p>
                        <Input.Password
                            spellCheck={false}
                            className={cx("input-password")}
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => handleChangeInput(e, "password")}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Email <span className={cx("required")}>*</span>
                        </p>
                        <Input
                            spellCheck={false}
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => handleChangeInput(e, "email")}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Nhập lại mật khẩu{" "}
                            <span className={cx("required")}>*</span>
                        </p>
                        <Input.Password
                            spellCheck={false}
                            className={cx("input-password")}
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Vai trò <span className={cx("required")}>*</span>
                        </p>
                        <Dropdown
                            options={roles}
                            placeholder="Chọn vai trò"
                            value={role}
                            onChange={(value) => handleSelect(value, "role")}
                        />
                    </div>
                    <div>
                        <p className={cx("title")}>
                            Tình trạng <span className={cx("required")}>*</span>
                        </p>
                        <Dropdown
                            options={statuses}
                            placeholder="Chọn trạng thái"
                            value={status}
                            onChange={(value) => handleSelect(value, "status")}
                        />
                    </div>
                </div>
                <p>
                    <span className={cx("required")}>*</span> Là trường thông
                    tin bắt buộc
                </p>
            </div>
            <div className={cx("footer")}>
                <button
                    onClick={handleBack}
                    className={cx("cancel-btn", "btn btn-outline")}
                >
                    Hủy bỏ
                </button>
                <Button
                    loading={loading}
                    onClick={handleUpdate}
                    className={cx("update-btn", "btn btn-primary")}
                >
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default UpdateAccount;
