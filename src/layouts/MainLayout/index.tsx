import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import MenuSidebar from "../../components/MenuSidebar";
import { IChildren } from "@/interfaces";
import Topbar from "@/components/Topbar";

const cx = classNames.bind(styles);

function MainLayout({ children }: IChildren) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <MenuSidebar />
            </div>
            <div className={cx("right")}>
                <Topbar />
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
