import { pathSelectors } from "@/redux/selectors";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./Path.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";
import pathSlice from "@/redux/slices/pathSlice";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function Path() {
    const { path } = useSelector(pathSelectors);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [title, setTitle] = useState(path[path.length - 1]?.name);
    useEffect(() => {
        setTitle(path[path.length - 1]?.name);
    }, [path]);
    useEffect(() => {
        document.title = title;
    }, [pathname, title]);
    return (
        <div className={cx("wrapper")}>
            {path.map((item, index) => {
                return (
                    <Link
                        to={item.link}
                        onClick={() =>
                            dispatch(
                                pathSlice.actions.setPath(
                                    path.slice(0, index + 1)
                                )
                            )
                        }
                        key={index}
                        className={cx("btn-path")}
                    >
                        {item?.name}
                    </Link>
                );
            })}
        </div>
    );
}

export default Path;
