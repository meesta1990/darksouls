import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { IUser, User } from "../../entities/User";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: new User()
    },
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    },
});

export const { setUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;