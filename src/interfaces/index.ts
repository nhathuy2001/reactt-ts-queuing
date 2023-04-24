import { Timestamp } from "firebase/firestore";
import { ReactNode } from "react";

export interface IChildren {
    children?: JSX.Element;
}

export interface IPath {
    name: string;
    link: string;
}

export interface IUser {
    key?: string;
    _id: string;
    photoURL?: string;
    userName: string;
    password: string;
    displayName: string;
    email: string;
    phone: string;
    role: string;
    status?: string;
}


export interface IUpdateProps {
    id: string;
    payload: any;
}
export interface IDevice {
    key?: string;
    _id: string;
    deviceCode: string;
    deviceName: string;
    deviceType?: string;
    ipAddress?: string;
    userName?: string;
    password?: string;
    serviceUse?: string;
    statusActive?: string;
    statusConnect?: string;
}

export interface IOverview {
    name: string;
    percent1: number;
    percent2: number;
    percent3?: number;
    total: string;
    color: string;
    color2: string;
    color3?: string;
    status1: string;
    status2: string;
    status3?: string;
    number1: string;
    number2: string;
    number3?: string;
    icon: React.ReactNode;
}


export interface IDropdown {
    label: string;
    value: string;
}

export interface IService {
    key?: string;
    _id: string;
    serviceCode: string;
    serviceName: string;
    description?: string;
    status?: string;
    autoIncrement?: {
        checked?: boolean;
        from?: string;
        to?: string;
    };
    prefix?: {
        checked?: boolean;
        value?: string;
    };
    surfix?: {
        checked?: boolean;
        value?: string;
    };
    reset?: boolean;
}
export interface INumerical {
    key?: string;
    _id?: string;
    serviceCode?: string;
    stt: string;
    clientName: string | undefined;
    service: string;
    createdAt: Timestamp;
    expired: Timestamp;
    resource: string;
    status: string;
    phone?: string;
    email?: string;
}
export interface IUpdateProps {
    id: string;
    payload: any;
}

export interface IRole {
    key?: string;
    _id: string;
    roleName: string;
    quantity: number;
    description: string;
    roles: any;
}