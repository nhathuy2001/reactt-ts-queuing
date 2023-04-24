import { db } from "@/firebase";
import { IRole, IUpdateProps } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addDoc,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

const initialState = {
    loading: false,
    roles: [] as IRole[],
    infoUpdateRole: {} as IRole,
};

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setInfoUpdate: (state, action) => {
            state.infoUpdateRole = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllRole.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload;
            })
            .addCase(fetchAllRole.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(addRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addRole.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateRole.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateRole.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const fetchAllRole = createAsyncThunk("fetchAllRole", async () => {
    let data: IRole[] = [];
    const querySnapshot = await getDocs(collection(db, "roles"));
    querySnapshot.forEach((doc) => {
        data.push({
            _id: doc.id,
            key: doc.id,
            ...doc.data(),
        } as IRole);
    });
    return data.sort((a, b) => a.roleName.localeCompare(b.roleName));
});

export const addRole = createAsyncThunk("addRole", async (role: IRole) => {
    let res;
    try {
        const ref = await addDoc(collection(db, "roles"), {
            ...role,
        });
        res = ref.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return res;
});

export const updateRole = createAsyncThunk(
    "updateRole",
    async ({ id, payload }: IUpdateProps) => {
        let res = false;
        try {
            const ref = doc(db, "roles", id);
            await updateDoc(ref, { ...payload });
            res = true;
        } catch (error) {
            console.log(error);
            res = false;
        }
        return res;
    }
);

export const increaseQuantityUser = createAsyncThunk(
    "increaseQuantityUser",
    async (roleName: string) => {
        const response = await findRoleIdByName(roleName);
        let res = false;
        if (response._id) {
            try {
                const ref = doc(db, "roles", response._id);
                await updateDoc(ref, { quantity: response.quantity + 1 });
                res = true;
            } catch (error) {
                console.error(error);
                res = false;
            }
        }
        return res;
    }
);

const findRoleIdByName = async (name: string) => {
    const querySnapshot = await getDocs(collection(db, "roles"));
    let res: IRole = {} as IRole;
    querySnapshot.forEach((doc) => {
        if (doc.data().roleName === name)
            res = { _id: doc.id, ...doc.data() } as IRole;
    });
    return res;
};

export default roleSlice;
