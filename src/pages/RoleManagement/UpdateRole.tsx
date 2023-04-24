import { Button, Checkbox, Input } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./RoleManagement.module.scss";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import { useSelector } from "react-redux";
import { roleSelectors } from "@/redux/selectors";
import MessageNotify from "@/components/MessageNotify";
import { updateRole } from "@/redux/slices/roleSlice";
import { useAppDispatch } from "@/redux/store";
import { IRole } from "@/interfaces";

const cx = classNames.bind(styles);

const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];

function UpdateRole() {
    const { loading, infoUpdateRole } = useSelector(roleSelectors);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [state, setState] = useState({ ...infoUpdateRole });

    const {
        roleName,
        description,
        roles: { group1, group2, group3 },
    } = state;
    const [checkAll, setCheckAll] = useState({
        checkAllGroup1: group1.length === plainOptions.length,
        checkAllGroup2: group2.length === plainOptions.length,
        checkAllGroup3: group3.length === plainOptions.length,
    });

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

    const handleUpdateRole = async () => {
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
        const payload: any = { ...state };
        delete payload["_id"];
        delete payload["key"];
        const res = await dispatch(
            updateRole({ id: infoUpdateRole._id, payload })
        );
        if (res.payload) {
            MessageNotify("success", "Đã cập nhật vai trò", "topRight");
            navigate(-1);
        } else
            MessageNotify(
                "error",
                "Đã có lỗi xảy ra! Vui lòng thử lại",
                "topRight"
            );
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
                    onClick={handleUpdateRole}
                    loading={loading}
                    className={cx("update-btn", "btn btn-primary")}
                >
                    Cập nhật
                </Button>
            </div>
        </div>
    );
}

export default UpdateRole;
