import classNames from "classnames/bind";
import { DatePicker } from "antd";
import moment from "moment";
import { ArrowDownIcon, ArrowIcon, ArrowRightIcon } from "../Icons";
import "./OverrideDatePickerAntd.scss";

function DateRangePicker() {
    const selectionRange = {
        key: "selection",
    };
    return (
        <div>
            <DatePicker.RangePicker
                suffixIcon={null}
                format="DD/MM/YYYY"
                separator={<ArrowRightIcon />}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            />
        </div>
    );
}

export default DateRangePicker;
