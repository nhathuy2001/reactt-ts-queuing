import { AddSquare } from "@/components/Icons";
import Search from "@/components/Search";
import Table from "@/components/Table";
import config from "@/configs";
import { db } from "@/firebase";
import { useDebounce } from "@/hooks";
import { IRole } from "@/interfaces";
import { roleSelectors } from "@/redux/selectors";
import pathSlice from "@/redux/slices/pathSlice";
import roleSlice, { fetchAllRole } from "@/redux/slices/roleSlice";
import { useAppDispatch } from "@/redux/store";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./RoleManagement.module.scss";

const cx = classNames.bind(styles);

function RoleManagement() {
    const { roles, loading } = useSelector(roleSelectors);
    const dispatch = useAppDispatch();
    const [dataSource, setDataSource] = useState<IRole[]>([]);
    const [searchText, setSearchText] = useState("");
    const debounceValue = useDebounce(searchText, 500);
    const columns = [
        {
            title: "Tên vai trò",
            dataIndex: "roleName",
            key: "roleName",
        },
        {
            title: "Số người dùng",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            render: (record: IRole) => (
                <Link
                    onClick={() => handleClickUpdate(record)}
                    to={config.routes.updateRole}
                    className="btn-link"
                >
                    Cập nhật
                </Link>
            ),
        },
    ];

    useEffect(() => {
        snapshotDatabase();
        dispatch(fetchAllRole());
    }, []);

    useEffect(() => {
        handleFilter();
    }, [debounceValue]);

    const snapshotDatabase = () => {
        onSnapshot(collection(db, "roles"), (snapshot) => {
            let data: IRole[] = [];
            snapshot.docs.map((doc) => {
                data.push({
                    _id: doc.id,
                    key: doc.id,
                    ...doc.data(),
                } as IRole);
            });
            setDataSource(
                data.sort((a, b) => a.roleName.localeCompare(b.roleName))
            );
        });
    };

    const handleFilter = () => {
        setDataSource(
            roles.filter((role) =>
                role?.roleName
                    ?.toLowerCase()
                    .includes(debounceValue.toLowerCase())
            )
        );
    };

    const handleClickUpdate = (record: IRole) => {
        dispatch(roleSlice.actions.setInfoUpdate(record));
        dispatch(
            pathSlice.actions.appendPath({
                name: "Cập nhật vai trò",
                link: "",
            })
        );
    };

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <h1 className={cx("heading")}>Danh sách vai trò</h1>
                <div className={cx("search")}>
                    <span className={cx("title")}>Từ khoá</span>
                    <Search
                        placeholder="Nhập từ khóa"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </header>
            <div className={cx("body")}>
                <Table
                    columns={columns}
                    rows={dataSource}
                    pagination={false}
                    loading={loading}
                />
                <Link
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Thêm vai trò",
                                link: "",
                            })
                        )
                    }
                    to={config.routes.addRole}
                    className={cx("addRole-btn")}
                >
                    <AddSquare />
                    <span>
                        Thêm <br /> vai trò
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default RoleManagement;
