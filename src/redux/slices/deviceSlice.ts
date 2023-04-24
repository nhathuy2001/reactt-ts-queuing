import { db } from "@/firebase";
import { IDevice, IUpdateProps } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

const initialState = {
    loading: false,
    devices: [] as IDevice[],
    detailDevice: {} as IDevice,
};

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setDetailDevice: (state, action) => {
            state.detailDevice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllDevice.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllDevice.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload as unknown as IDevice[];
            })
            .addCase(fetchAllDevice.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const fetchAllDevice = createAsyncThunk("fetAllDevice", async () => {
    let data: IDevice[] = [];
    const querySnapshot = await getDocs(collection(db, "devices"));
    querySnapshot.forEach((doc) => {
        data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IDevice);
    });
    return data;
});

export const addDevice = createAsyncThunk(
    "addDevice",
    async (device: IDevice) => {
        let res;
        try {
            const ref = await addDoc(collection(db, "devices"), { ...device });
            res = ref.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return res;
    }
);

export const updateDevice = createAsyncThunk(
    "updateDevice",
    async ({ id, payload }: IUpdateProps) => {
        const ref = doc(db, "devices", id);
        await updateDoc(ref, { ...payload });
    }
);

export default deviceSlice;
