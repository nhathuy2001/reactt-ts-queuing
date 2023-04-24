import classNames from "classnames/bind";
import { SearchIcon } from "../Icons";
import styles from "./Search.module.scss";
const cx = classNames.bind(styles);

type SearchProps = {
    value?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    placeholder?: string | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

function Search({
    value = "",
    type = "text",
    placeholder = "",
    onChange,
    ...props
}: SearchProps) {
    return (
        <div className={cx("wrapper")}>
            <input
                spellCheck={false}
                className={cx("text-box")}
                type={type}
                placeholder={placeholder}
                defaultValue={value}
                onChange={onChange}
                {...props}
            />
            <SearchIcon className={cx("icon")} />
        </div>
    );
}

export default Search;
