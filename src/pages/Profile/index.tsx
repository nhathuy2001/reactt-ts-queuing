import images from "@/assets/images";
import { CameraIcon } from "@/components/Icons";
import { userSelectors } from "@/redux/selectors";
import { Avatar, Input, Typography } from "antd";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);

function Profile() {
    const { currentUser } = useSelector(userSelectors);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("user-avatar")}>
                <div className={cx("wrap-avatar")}>
                    <Avatar
                        className={cx("avatar")}
                        src={currentUser?.photoURL}
                        icon={
                            <span>
                                {currentUser?.displayName
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </span>
                        }
                    />
                    <CameraIcon className={cx("icon-camera")} />
                </div>
                <Typography.Title className={cx("name")} level={2}>
                    {currentUser?.displayName}
                </Typography.Title>
            </div>
            <div className={cx("user-info")}>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Tên người dùng
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.displayName} />
                </div>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Tên đăng nhập
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.userName} />
                </div>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Số điện thoại
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.phone} />
                </div>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Mật khẩu
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.password} />
                </div>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Email:
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.email} />
                </div>
                <div className={cx("wrap-info")}>
                    <Typography.Text className={cx("title")}>
                        Vai trò:
                    </Typography.Text>
                    <Input disabled={true} value={currentUser?.role} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
