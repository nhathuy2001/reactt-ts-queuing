import React from "react";
import config from "@/configs";
// Layout
import MainLayout from "../layouts/MainLayout";
import SecondaryLayout from "@/layouts/SecondaryLayout";

// Pages
import RootPage from "@/pages";
import Login from "@/pages/Login";
const Equipment = React.lazy(() => import("@/pages/Device"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const Report = React.lazy(() => import("@/pages/Report"));
const Service = React.lazy(() => import("@/pages/Service"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const ForgotPass = React.lazy(() => import("@/pages/ForgotPass"));
const ResetPass = React.lazy(() => import("@/pages/ResetPass"));
const NumericalOrder = React.lazy(() => import("@/pages/NumericalOrder"));
const AddDevice = React.lazy(() => import("@/pages/Device/AddDevice"));
const DetailDevice = React.lazy(() => import("@/pages/Device/DetailDevice"));
const UpdateDevice = React.lazy(() => import("@/pages/Device/UpdateDevice"));
const AddService = React.lazy(() => import("@/pages/Service/AddService"));
const DetailService = React.lazy(() => import("@/pages/Service/DetailService"));
const UpdateService = React.lazy(() => import("@/pages/Service/UpdateService"));
const RoleManagement = React.lazy(() => import("@/pages/RoleManagement"));
const UserLog = React.lazy(() => import("@/pages/UserLog"));
const AddRole = React.lazy(() => import("@/pages/RoleManagement/AddRole"));
const AccountManagement = React.lazy(() => import("@/pages/AccountManagement"));
const UpdateRole = React.lazy(
    () => import("@/pages/RoleManagement/UpdateRole")
);
const AddAccount = React.lazy(
    () => import("@/pages/AccountManagement/AddAccount")
);
const UpdateAccount = React.lazy(
    () => import("@/pages/AccountManagement/UpdateAccount")
);
const AddNewNumber = React.lazy(
    () => import("@/pages/NumericalOrder/AddNewNumber")
);
const DetailNumber = React.lazy(
    () => import("@/pages/NumericalOrder/DetailNumber")
);

export const routes = [
    { path: config.routes.home, component: RootPage, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.forgotPass, component: ForgotPass, layout: null },
    { path: config.routes.resetPass, component: ResetPass, layout: null },
    {
        path: config.routes.dashboard,
        component: Dashboard,
        layout: SecondaryLayout,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: MainLayout,
    },
    {
        path: config.routes.device,
        component: Equipment,
        layout: MainLayout,
    },
    {
        path: config.routes.service,
        component: Service,
        layout: MainLayout,
    },
    {
        path: config.routes.numberOrder,
        component: NumericalOrder,
        layout: MainLayout,
    },
    { path: config.routes.report, component: Report, layout: MainLayout },
    {
        path: config.routes.addDevice,
        component: AddDevice,
        layout: MainLayout,
    },
    {
        path: config.routes.detailDevice,
        component: DetailDevice,
        layout: MainLayout,
    },
    {
        path: config.routes.updateDevice,
        component: UpdateDevice,
        layout: MainLayout,
    },
    {
        path: config.routes.addService,
        component: AddService,
        layout: MainLayout,
    },
    {
        path: config.routes.detailService,
        component: DetailService,
        layout: MainLayout,
    },
    {
        path: config.routes.updateService,
        component: UpdateService,
        layout: MainLayout,
    },
    {
        path: config.routes.addNewNumber,
        component: AddNewNumber,
        layout: MainLayout,
    },
    {
        path: config.routes.detailNumber,
        component: DetailNumber,
        layout: MainLayout,
    },
    {
        path: config.routes.addRole,
        component: AddRole,
        layout: MainLayout,
    },
    {
        path: config.routes.updateRole,
        component: UpdateRole,
        layout: MainLayout,
    },
    {
        path: config.routes.userLog,
        component: UserLog,
        layout: MainLayout,
    },
    {
        path: config.routes.addAccount,
        component: AddAccount,
        layout: MainLayout,
    },
    {
        path: config.routes.updateAccount,
        component: UpdateAccount,
        layout: MainLayout,
    },
    {
        path: config.routes.roleManagement,
        component: RoleManagement,
        layout: MainLayout,
    },
    {
        path: config.routes.accountManagement,
        component: AccountManagement,
        layout: MainLayout,
    },

];
