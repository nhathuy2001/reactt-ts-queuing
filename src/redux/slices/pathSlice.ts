import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    path: [{ name: "Dashboard", link: "/dashboard" }],
    selectedMenu: "Dashboard",
};

const pathSlice = createSlice({
    name: "path",
    initialState,
    reducers: {
        appendPath: (state, action) => {
            state.path.push(action.payload);
        },
        setPath: (state, action) => {
            state.path = action.payload;
        },
        back: (state) => {
            state.path = state.path.slice(0, state.path.length - 1);
        },
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
    },
});

export default pathSlice;
