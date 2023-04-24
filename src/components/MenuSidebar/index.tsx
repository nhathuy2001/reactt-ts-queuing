import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Image, Menu } from "antd";
import type { MenuProps } from "antd";
import styles from "./MenuSidebar.module.scss";
import images from "@/assets/images";
import {
    DashboardIcon03,
    Element4,
    LogoutIcon,
    Monitor,
    MoreIcon,
    ReportIcon,
    ServiceIcon,
    SettingIcon,
} from "@/components/Icons";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { pathSelectors } from "@/redux/selectors";
import { useEffect, useState } from "react";
import config from "@/configs";

const cx = classNames.bind(styles);

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps["items"] = [
    getItem("Dashboard", "/dashboard", <Element4 />),
    getItem("Thiết bị", "/device", <Monitor />),
    getItem("Dịch vụ", "/services", <ServiceIcon />),
    getItem("Cấp số", "/numerical-order", <DashboardIcon03 />),
    getItem("Báo cáo", "/report", <ReportIcon />),
    getItem("Cài đặt hệ thống", "Cài đặt hệ thống", <SettingIcon />, [
        getItem("Quản lý vai trò", "/settings/role-management"),
        getItem("Quản lý tài khoản", "/settings/account-management"),
        getItem("Nhật ký người dùng", "/settings/user-log"),
    ]),
];
function MenuSidebar() {
    const { pathname } = useLocation();
    const [selected, setSelected] = useState(pathname);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        switch (pathname) {
            case "/dashboard":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Dashboard",
                            link: config.routes.dashboard,
                        },
                    ])
                );
                break;
            case "/device":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Thiết bị",
                            link: "",
                        },
                        {
                            name: "Danh sách thiết bị",
                            link: config.routes.device,
                        },
                    ])
                );
                break;
            case "/services":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Dịch vụ",
                            link: "",
                        },
                        {
                            name: "Danh sách dịch vụ",
                            link: config.routes.service,
                        },
                    ])
                );
                break;
            case "/numerical-order":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Cấp số",
                            link: "",
                        },
                        {
                            name: "Danh sách cấp số",
                            link: config.routes.numberOrder,
                        },
                    ])
                );
                break;
            case "/report":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Báo cáo",
                            link: "",
                        },
                        {
                            name: "Lập báo cáo",
                            link: config.routes.report,
                        },
                    ])
                );
                break;
            case "/settings/role-management":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Cài đặt hệ thống",
                            link: "",
                        },
                        {
                            name: "Quản lý vai trò",
                            link: config.routes.roleManagement,
                        },
                    ])
                );
                break;
            case "/settings/account-management":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Cài đặt hệ thống",
                            link: "",
                        },
                        {
                            name: "Quản lý tài khoản",
                            link: config.routes.accountManagement,
                        },
                    ])
                );
                break;
            case "/settings/user-log":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Cài đặt hệ thống",
                            link: "",
                        },
                        {
                            name: "Nhật ký hoạt động",
                            link: config.routes.userLog,
                        },
                    ])
                );
                break;
            case "/profile":
                setSelected(pathname);
                dispatch(
                    pathSlice.actions.setPath([
                        {
                            name: "Thông tin cá nhân",
                            link: "",
                        },
                    ])
                );
                break;
        }
    }, [pathname]);
    const handleSelectItem: MenuProps["onClick"] = (e) => {
        navigate(e.key);
        setSelected(e.key);
    };
    const handleLogout = () => {
        navigate("/login");
    };
    return (
        <div className={cx("wrapper")}>
            <Image srcSet={`${images.logoDashboard} 2x`} preview={false} />
            <Menu
                className={cx("menubar")}
                onClick={handleSelectItem}
                mode="vertical"
                items={items}
                expandIcon={<MoreIcon />}
                selectedKeys={pathname === "/profile" ? [""] : [selected]}
            />
            <Button
                onClick={handleLogout}
                className={cx("btn-logout", "btn btn-primary")}
                icon={<LogoutIcon />}
            >
                Đăng xuất
            </Button>
        </div>
    );
}

export default MenuSidebar;
