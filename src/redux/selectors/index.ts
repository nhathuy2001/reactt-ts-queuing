import { RootState } from "../store";

export const pathSelectors = (state: RootState) => state.path;
export const userSelectors = (state: RootState) => state.users;
export const deviceSelectors = (state: RootState) => state.devices;
export const serviceSelectors = (state: RootState) => state.services;
export const numericalSelectors = (state: RootState) => state.numericalList;
export const roleSelectors = (state: RootState) => state.role;
