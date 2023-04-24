import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import styles from "./SecondaryLayout.module.scss";
import MenuSidebar from "../../components/MenuSidebar";
import { IChildren } from "@/interfaces";
import OverView from "../../components/OverView";
import Topbar from "../../components/Topbar";

const cx = classNames.bind(styles);

function SecondaryLayout({ children }: IChildren) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("left")}>
                <MenuSidebar />
            </div>
            <div className={cx("right")}>
                <Topbar />
                <div className={cx("center")}>
                    <div className={cx("content")}>{children}</div>
                    <div className={cx("over-view")}>
                        <OverView />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondaryLayout;
