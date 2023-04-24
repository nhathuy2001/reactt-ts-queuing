import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import { ChevronDown } from "../Icons";
import { Select } from "antd";
import type { SelectProps } from "antd";
import "./CustomStyleSelectAntd.scss";

const cx = classNames.bind(styles);

interface DropdownProps {
    className?: string;
    options: SelectProps["options"];
    placeholder?: string;
    value?: any;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    mode?: "multiple" | "tags" | undefined;
}

const Dropdown: React.FC<DropdownProps> = ({
    className,
    options,
    value,
    placeholder,
    onChange,
    mode,
    ...props
}) => {
    const [select] = useState<any>(() => {
        let initialValue;
        if (options) {
            initialValue = options[0]?.label;
        }
        if (placeholder) initialValue = undefined;
        return initialValue;
    });
    return (
        <div className={cx("wrapper")}>
            <Select
                mode={mode}
                options={options}
                className={cx("select")}
                defaultValue={select}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                suffixIcon={<ChevronDown className={cx("icon")} />}
                {...props}
            />
        </div>
    );
};

export default Dropdown;
