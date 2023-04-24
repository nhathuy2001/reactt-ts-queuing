import { useState } from "react";
import { Button, Calendar as CustomCalendar } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import moment from "moment";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./OverrideStyleCalendar.scss";

function Calendar() {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    moment.updateLocale("en", {
        weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    });

    const [preNextMonth, setPreNextMonth] = useState(moment());

    return (
        <div className="calendar-wrap">
            <CustomCalendar
                fullscreen={false}
                headerRender={({ value }) => {
                    const year: number = value.year();
                    const month: number = value.month();
                    const date: number = value.date();

                    const monthName: string = moment
                        .months(month)
                        .substring(0, 3);
                    return (
                        <div className="calendar__header">
                            <Button
                                type="link"
                                className="btn-prev"
                                onClick={() =>
                                    setPreNextMonth(
                                        moment(value.add(-1, "months"))
                                    )
                                }
                            >
                                <LeftOutlined style={{ color: "#ff7506" }} />
                            </Button>
                            <div className="date-time">
                                <span>{date}</span>
                                <span className="month">{monthName}</span>
                                <span>{year}</span>
                            </div>
                            <Button
                                type="link"
                                className="btn-next"
                                onClick={() =>
                                    setPreNextMonth(
                                        moment(value.add(1, "months"))
                                    )
                                }
                            >
                                <RightOutlined style={{ color: "#ff7506" }} />
                            </Button>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
            />
        </div>
    );
}

export default Calendar;
