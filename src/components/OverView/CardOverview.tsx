import classNames from "classnames/bind";
import { DashboardIcon03, Monitor } from "@/components/Icons";
import { Progress } from "antd";
import styles from "./OverView.module.scss";
import { IOverview } from "@/interfaces";

const cx = classNames.bind(styles);

type CardOverviewProps = {
    data: IOverview;
};

function CardOverview({ data }: CardOverviewProps) {
    return (
        <div className={cx("card-wrap")}>
            <div className={cx("progress-wrap")}>
                <Progress
                    className={cx("progress")}
                    type="circle"
                    percent={data.percent1}
                    format={() => (
                        <span className={cx("text-total")}>
                            {data.percent1}%
                        </span>
                    )}
                    width={60}
                    strokeColor={data.color}
                    trailColor="var(--gray-50)"
                />
                <Progress
                    className={cx("progress")}
                    type="circle"
                    percent={data.percent2}
                    format={() => ""}
                    width={50}
                    strokeColor={data.color2}
                    trailColor="var(--gray-50)"
                />
                {data.percent3 && (
                    <Progress
                        className={cx("progress")}
                        type="circle"
                        percent={data.percent3}
                        format={() => ""}
                        width={40}
                        strokeColor={data.color3}
                        trailColor="var(--gray-50)"
                    />
                )}
            </div>
            <div className={cx("wrap-total")}>
                <h1 className={cx("total")}>
                    <span>{data.total}</span>
                </h1>
                <div className={cx("category")}>
                    {data.icon}{" "}
                    <span style={{ color: data.color }}>{data.name}</span>
                </div>
            </div>
            <div className={cx("status")}>
                <span className={cx("status-1")}>
                    <span
                        style={{ color: data.color }}
                        className={cx("dot")}
                    ></span>
                    <span>{data.status1}</span>
                </span>
                <span className={cx("status-2")}>
                    <span
                        style={{ color: data.color2 }}
                        className={cx("dot")}
                    ></span>
                    <span>{data.status2}</span>
                </span>
                {data?.status3 && (
                    <span className={cx("status-3")}>
                        <span
                            style={{ color: data.color3 }}
                            className={cx("dot")}
                        ></span>
                        <span>{data?.status3}</span>
                    </span>
                )}
            </div>
            <div className={cx("quantity")} style={{ color: data.color }}>
                <span>{data.number1}</span>
                <span>{data.number2}</span>
                {data?.number3 && <span>{data?.number3}</span>}
            </div>
        </div>
    );
}

export default CardOverview;
