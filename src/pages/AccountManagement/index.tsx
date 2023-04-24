import Dropdown from "@/components/Dropdown";
import { AddSquare } from "@/components/Icons";
import Search from "@/components/Search";
import Table from "@/components/Table";
import config from "@/configs";
import { db } from "@/firebase";
import { useDebounce } from "@/hooks";
import { IDropdown, IUser } from "@/interfaces";
import { roleSelectors, userSelectors } from "@/redux/selectors";
import pathSlice from "@/redux/slices/pathSlice";
import { fetchAllRole } from "@/redux/slices/roleSlice";
import UserSlice, { fetchAllUsers } from "@/redux/slices/UserSlice";
import { useAppDispatch } from "@/redux/store";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./AccountManagement.module.scss";

const cx = classNames.bind(styles);

function AccountManagement() {
    const dispatch = useAppDispatch();
    const { roles } = useSelector(roleSelectors);
    const { users, loading } = useSelector(userSelectors);
    const [searchValue, setSearchValue] = useState("");
    const [dataSource, setDataSource] = useState<IUser[]>([]);
    const [roleList, setRoleList] = useState<IDropdown[]>([
        {
            label: "Tất cả",
            value: "Tất cả",
        },
    ]);
    const debouncedValue = useDebounce(searchValue, 500);
    useEffect(() => {
        snapshotDB();
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        setDataSource(
            users.filter((item) =>
                item.displayName
                    .toUpperCase()
                    .includes(debouncedValue.toUpperCase())
            )
        );
    }, [debouncedValue]);

    useEffect(() => {
        dispatch(fetchAllRole());
        let data: IDropdown[] = [];
        roles.forEach((role) => {
            data.push({
                label: role.roleName,
                value: role.roleName,
            });
        });
        setRoleList([{ label: "Tất cả", value: "Tất cả" }, ...data]);
    }, [roles.length]);

    const columns = [
        {
            title: "Tên đăng nhập",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Họ tên",
            dataIndex: "displayName",
            key: "displayName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Trạng thái hoạt động",
            dataIndex: "status",
            key: "status",
            render: (text: string) => (
                <div
                    className={
                        text?.toUpperCase() === "Hoạt động"?.toUpperCase()
                            ? "status active"
                            : "status stopped"
                    }
                >
                    {text}
                </div>
            ),
        },
        {
            render: (record: IUser) => (
                <Link
                    className="btn-link"
                    to={config.routes.updateAccount}
                    onClick={() => {
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Cập nhật tài khoản",
                                link: "",
                            })
                        );
                        dispatch(UserSlice.actions.setUserUpdate(record));
                    }}
                >
                    Cập nhật
                </Link>
            ),
        },
    ];

    const snapshotDB = () => {
        onSnapshot(collection(db, "users"), (snapshot) => {
            let data: IUser[] = [];
            snapshot.docs.map((doc) => {
                data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IUser);
            });
            setDataSource(
                data.sort((a, b) => a.displayName.localeCompare(b.displayName))
            );
        });
    };

    const handleFilter = (value: React.ChangeEvent<HTMLInputElement>) => {
        String(value) === "Tất cả"
            ? setDataSource(users)
            : setDataSource(
                  users.filter((item: IUser) => item.role === String(value))
              );
    };

    return (
        <div className={cx("wrapper")}>
            <h1 className={cx("heading")}>Danh sách tài khoản</h1>
            <div className={cx("filter")}>
                <div>
                    <span className={cx("title")}>Tên vai trò</span>
                    <Dropdown
                        options={roleList}
                        onChange={(value) => handleFilter(value)}
                    />
                </div>
                <div>
                    <span className={cx("title")}>Từ khoá</span>
                    <Search
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Nhập vào họ tên"
                    />
                </div>
            </div>
            <div className={cx("body")}>
                <Table columns={columns} rows={dataSource} loading={loading} />
                <Link
                    onClick={() =>
                        dispatch(
                            pathSlice.actions.appendPath({
                                name: "Thêm tài khoản",
                                link: "",
                            })
                        )
                    }
                    to={config.routes.addAccount}
                    className={cx("add-btn")}
                >
                    <AddSquare />
                    <span>Thêm tài khoản</span>
                </Link>
            </div>
        </div>
    );
}

export default AccountManagement;
