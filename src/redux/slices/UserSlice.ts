import { db } from "@/firebase";
import { IUpdateProps, IUser } from "@/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const initialState = {
    loading: false,
    users: [] as IUser[],
    currentUser: undefined as IUser | undefined,
    userUpdate: {} as IUser,
};

const UserSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserUpdate: (state, action) => {
            state.userUpdate = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(SignIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(SignIn.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(SignIn.rejected, (state) => {
                state.loading = false;
                state.currentUser = undefined;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.loading = false;
            })
            .addCase(CheckEmailExists.pending, (state) => {
                state.loading = true;
            })
            .addCase(CheckEmailExists.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(CheckEmailExists.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const SignIn = createAsyncThunk(
    "SignIn",
    async ({ userName, password }: IUser) => {
        let data;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (
                doc.data().userName === userName &&
                doc.data().password === password
            )
                data = doc.data();
        });
        return data;
    }
);

export const CheckEmailExists = createAsyncThunk(
    "CheckEmailExists",
    async (email: string) => {
        let data;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().email === email)
                data = { _id: doc.id, ...doc.data() };
        });
        return data;
    }
);

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
    let data: IUser[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        data.push({ _id: doc.id, key: doc.id, ...doc.data() } as IUser);
    });
    return data.sort((a, b) => a.displayName.localeCompare(b.displayName));
});

export const addUser = createAsyncThunk("addUser", async (user: IUser) => {
    let res;
    try {
        const docRef = await addDoc(collection(db, "users"), { ...user });
        res = "success";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return res;
});

export const updateUser = createAsyncThunk(
    "updateUser",
    async ({ id, payload }: IUpdateProps) => {
        let res: boolean = true;
        try {
            const userRef = doc(db, "users", id);
            await updateDoc(userRef, { ...payload });
            res = true;
        } catch (error) {
            res = false;
        }
        return res;
    }
);

export default UserSlice;
