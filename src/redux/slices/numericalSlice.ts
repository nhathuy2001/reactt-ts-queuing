import { db } from "@/firebase";
import { INumerical } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";

type increaseSTTProps = {
    id: string;
    value: number;
};

const initialState = {
    loading: false,
    numericalList: [] as INumerical[],
    detailNumerical: {} as INumerical,
};

const numericalSlice = createSlice({
    name: "numerical",
    initialState,
    reducers: {
        setDetailNumerical: (state, action) => {
            state.detailNumerical = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNumerical.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllNumerical.fulfilled, (state, action) => {
                state.loading = false;
                state.numericalList = action.payload;
            })
            .addCase(fetchAllNumerical.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addNumerical.pending, (state) => {
                state.loading = true;
            })
            .addCase(addNumerical.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addNumerical.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchNumericalByCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNumericalByCode.fulfilled, (state, action) => {
                state.loading = false;
                state.numericalList = action.payload;
            })
            .addCase(fetchNumericalByCode.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const fetchAllNumerical = createAsyncThunk(
    "fetAllNumerical",
    async () => {
        let data: INumerical[] = [];
        const querySnapshot = await getDocs(collection(db, "numerical"));
        querySnapshot.forEach((doc) => {
            data.push({
                _id: doc.id,
                key: doc.id,
                ...doc.data(),
            } as INumerical);
        });
        return data.sort((a, b) => a.stt.localeCompare(b.stt));
    }
);
export const fetchNumericalByCode = createAsyncThunk(
    "fetchNumericalByCode",
    async (code: string) => {
        let data: INumerical[] = [];
        const querySnapshot = await getDocs(collection(db, "numerical"));
        querySnapshot.forEach((doc) => {
            if (doc.data().serviceCode === code)
                data.push({
                    _id: doc.id,
                    key: doc.id,
                    ...doc.data(),
                } as INumerical);
        });
        return data.sort((a, b) => a.stt.localeCompare(b.stt));
    }
);

export const addNumerical = createAsyncThunk(
    "addNumerical",
    async (data: INumerical) => {
        let res;
        try {
            const ref = await addDoc(collection(db, "numerical"), {
                ...data,
            });
            res = ref.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        return res;
    }
);

export const fetchSTTById = createAsyncThunk(
    "fetchSTTById",
    async (id: string) => {
        const docRef = doc(db, "stt", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().value;
        } else {
            console.log("No such document!");
        }
    }
);

export const initializeSTT = createAsyncThunk(
    "addNewSTT",
    async (id: string) => {
        await setDoc(doc(db, "stt", id), { value: 1 });
    }
);

export const increaseSTT = createAsyncThunk(
    "increaseSTT",
    async ({ id, value }: increaseSTTProps) => {
        const ref = doc(db, "stt", id);
        await updateDoc(ref, { value });
    }
);

export default numericalSlice;
