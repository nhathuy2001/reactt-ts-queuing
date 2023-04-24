import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const formatNumber = (number: number) => {
    let result: string = String(number);
    if (number > 0 && number < 10) result = "000" + number;
    else if (number < 100) result = "00" + number;
    else if (number < 1000) result = "0" + number;

    return result;
};

/**
 *
 * @param time If is Timestamp need .toDate()
 * @param format default HH:mm - DD/MM/YYYY
 * @returns String in format
 */

export const convertTimeToString = (
    time: Timestamp | Date | number,
    format = "HH:mm - DD/MM/YYYY"
) => {
    return moment(time).format(format);
};

/**
 *
 * @param time If is Timestamp need .toDate()
 * @param format default HH:mm - DD/MM/YYYY
 * @returns String in format
 */
export const findTheNextDays = (
    time: Date | Timestamp | number,
    days: number,
    unit = "days" as moment.unitOfTime.DurationConstructor | undefined,
    format = "HH:mm - DD/MM/YYYY"
) => {
    return moment(time).add(days, unit).format(format);
};

/**
 *
 * @param text String with date format. Example YYYY/MM/DD HH:mm:ss
 * @returns A new Timestamp representing the same point in time as the given date
 */

export const convertStringToTimestamp = (text: string) => {
    const date = new Date(text);
    return Timestamp.fromDate(date);
};
