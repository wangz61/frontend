import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    id: number;
    name: string;
    email: string;
    token: string;
}

const initialState: {user: UserState | null} = {
    user: null,
}

const slice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload

        },
        logoutUser: (state) => {
            state.user = null
        }
    }
})

export const { loginUser, logoutUser } = slice.actions
export default slice.reducer