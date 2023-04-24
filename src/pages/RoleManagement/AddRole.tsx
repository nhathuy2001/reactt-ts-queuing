import { Button, Checkbox, Input } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./RoleManagement.module.scss";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { roleSelectors } from "@/redux/selectors";
import MessageNotify from "@/components/MessageNotify";
import { useAppDispatch } from "@/redux/store";
import { addRole } from "@/redux/slices/roleSlice";
import { IRole } from "@/interfaces";

const cx = classNames.bind(styles);
const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

function AddRole() {
    const { loading } = useSelector(roleSelectors);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [checkAll, setCheckAll] = useState({
        checkAllGroup1: false,
        checkAllGroup2: false,
        checkAllGroup3: false,
    });
    const [state, setState] = useState({
        roleName: "",
        description: "",
        roles: {
            group1: [] as CheckboxValueType[],
            group2: [] as CheckboxValueType[],
            group3: [] as CheckboxValueType[],
        },
    });

    const {
        roleName,
        description,
        roles: { group1, group2, group3 },
    } = state;
    const { checkAllGroup1, checkAllGroup2, checkAllGroup3 } = checkAll;

    const handleCheckedFunc = (
        list: CheckboxValueType[],
        key1: "group1" | "group2" | "group3",
        key2: "checkAllGroup1" | "checkAllGroup2" | "checkAllGroup3"
    ) => {
        const copyGroup: any = { ...state.roles };
        const copyState: any = { ...checkAll };
        copyGroup[key1] = [...list];
        copyState[key2] = list.length === plainOptions.length;
        setState({
            ...state,
            roles: {
                ...copyGroup,
            },
        });
        setCheckAll(copyState);
    };

    const handleCheckedAll = (
        e: CheckboxChangeEvent,
        key1: string,
        key2: "group1" | "group2" | "group3"
    ) => {
        const copyState: any = { ...checkAll };
        const copyGroup = { ...state.roles };

        copyState[key1] = e.target.checked;
        (copyGroup[key2] = e.target.checked ? plainOptions : []),
            setCheckAll(copyState);
        setState({
            ...state,
            roles: {
                ...copyGroup,
            },
        });
    };

    const handleOnChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: "roleName" | "description"
    ) => {
        const copyState = { ...state };
        copyState[key] = e.target.value;
        setState(copyState);
    };

    const handleAddRole = async () => {
        if (
            !roleName ||
            (group1.length === 0 && group2.length === 0 && group3.length === 0)
        ) {
            MessageNotify(
                "error",
                <p>
                    Các trường dấu <span className="required">*</span> là bắt
                    buộc
                </p>,
                "topRight"
            );
            return;
        }

        const response = await dispatch(
            addRole({ ...state, quantity: 0 } as IRole)
        );
        if (response.payload) {
            MessageNotify("success", "Đã thêm vai trò mới", "topRight");
            navigate(-1);
        } else MessageNotify("error", "Đã có lỗi xảy ra!", "topRight");
    };

    return (
        <div className={cx("wrapper", "add-role")}>
            <h1 className={cx("heading")}>Danh sách vai trò</h1>
            <div className={cx("body")}>
                <h2 className={cx("sub-heading")}>Thông tin vai trò</h2>
                <div className={cx("wrap-content")}>
                    <div className={cx("content")}>
                        <p className={cx("title")}>
                            Tên vai trò
                            <span className={cx("required")}>*</span>
                        </p>
                        <Input
                            placeholder="Nhập tên vai trò"
                            spellCheck={false}
                            value={roleName}
                            onChange={(e) => handleOnChange(e, "roleName")}
                        />
                        <p className={cx("title")}>Mô tả:</p>
                        <Input.TextArea
                            className={cx("desc")}
                            placeholder="Nhập mô tả"
                            spellCheck={false}
                            value={description}
                            onChange={(e) => handleOnChange(e, "description")}
                        />
                        <p className={cx("title")}>
                            <span className={cx("required")}>*</span> Là trường
                            thông tin bắt buộc
                        </p>
                    </div>
                    <div className={cx("content")}>
                        <p className={cx("title")}>
                            Phân quyền chức năng
                            <span className={cx("required")}>*</span>
                        </p>
                        <div className={cx("group-func")}>
                            <div className={cx("func")}>
                                <h2 className={cx("sub-heading")}>
                                    Nhóm chức năng A
                                </h2>
                                <Checkbox
                                    onChange={(e) =>
                                        handleCheckedAll(
                                            e,
                                            "checkAllGroup1",
                                            "group1"
                                        )
                                    }
                                    checked={checkAllGroup1}
                                >
                                    Tất cả
                                </Checkbox>
                                <Checkbox.Group
                                    options={plainOptions}
                                    value={group1}
                                    onChange={(value) =>
                                        handleCheckedFunc(
                                            value,
                                            "group1",
                                            "checkAllGroup1"
                                        )
                                    }
                                />
                            </div>
                            <div className={cx("func")}>
                                <h2 className={cx("sub-heading")}>
                                    Nhóm chức năng B
                                </h2>
                                <Checkbox
                                    onChange={(e) =>
                                        handleCheckedAll(
                                            e,
                                            "checkAllGroup2",
                                            "group2"
                                        )
                                    }
                                    checked={checkAllGroup2}
                                >
                                    Tất cả
                                </Checkbox>
                                <Checkbox.Group
                                    options={plainOptions}
                                    value={group2}
                                    onChange={(value) =>
                                        handleCheckedFunc(
                                            value,
                                            "group2",
                                            "checkAllGroup2"
                                        )
                                    }
                                />
                            </div>
                            <div className={cx("func")}>
                                <h2 className={cx("sub-heading")}>
                                    Nhóm chức năng C
                                </h2>
                                <Checkbox
                                    onChange={(e) =>
                                        handleCheckedAll(
                                            e,
                                            "checkAllGroup3",
                                            "group3"
                                        )
                                    }
                                    checked={checkAllGroup3}
                                >
                                    Tất cả
                                </Checkbox>
                                <Checkbox.Group
                                    options={plainOptions}
                                    value={group3}
                                    onChange={(value) =>
                                        handleCheckedFunc(
                                            value,
                                            "group3",
                                            "checkAllGroup3"
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("footer")}>
                <button
                    onClick={() => navigate(-1)}
                    className={cx("cancel-btn", "btn btn-outline")}
                >
                    Hủy bỏ
                </button>
                <Button
                    className={cx("add-btn", "btn btn-primary")}
                    loading={loading}
                    onClick={handleAddRole}
                >
                    Thêm
                </Button>
            </div>
        </div>
    );
}

export default AddRole;
