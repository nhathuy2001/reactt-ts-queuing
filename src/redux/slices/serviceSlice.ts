import { db } from "@/firebase";
import { IService, IUpdateProps } from "@/interfaces";
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
    services: [] as IService[],
    detailService: {} as IService,
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        setDetailService: (state, action) => {
            state.detailService = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllService.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllService.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload as unknown as IService[];
            })
            .addCase(fetchAllService.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addService.pending, (state) => {
                state.loading = true;
            })
            .addCase(addService.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addService.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateService.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateService.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateService.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const fetchAllService = createAsyncThunk("fetAllService", async () => {
    let data: IService[] = [];
    const querySnapshot = await getDocs(collection(db, "services"));
    querySnapshot.forEach((doc) => {
        data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IService);
    });
    return data.sort((a, b) => a.serviceCode.localeCompare(b.serviceCode));
});

export const checkServiceCode = createAsyncThunk(
    "checkServiceCode",
    async (serviceCode: string) => {
        let data = false;
        const querySnapshot = await getDocs(collection(db, "services"));
        querySnapshot.forEach((doc) => {
            if (doc.data().serviceCode === serviceCode) data = true;
        });
        return data;
    }
);

export const addService = createAsyncThunk(
    "addService",
    async (service: IService) => {
        let res;
        try {
            const ref = await addDoc(collection(db, "services"), {
                ...service,
            });
            res = ref.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return res;
    }
);

export const updateService = createAsyncThunk(
    "updateService",
    async ({ id, payload }: IUpdateProps) => {
        let res;
        try {
            const ref = doc(db, "services", id);
            await updateDoc(ref, { ...payload });
            res = true;
        } catch (error) {
            console.log(error);
            res = false;
        }
        return res;
    }
);

export default serviceSlice;
