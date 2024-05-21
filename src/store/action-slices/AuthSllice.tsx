import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { expiredTime } from "src/common/helper"
import { AuthState } from "src/models/Auth"
import { authRequestToken } from "../action-thunk"

const initialState: AuthState = {
    isLogin: true,
    isRemember: false,
    access_token: null,
    user_data: null,
    tokenExpiration: 0,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onSetLogin: (state: AuthState, {payload}) => {
            state.isLogin = payload
        },
        onSetUserData: (state: AuthState, {payload}: PayloadAction<AuthState['user_data']>) => {
            state.user_data = payload
        },
        onRemember: (state: AuthState) => {
            state.isRemember = true
        },
        onLogout: (state: AuthState) => {
            state.isLogin = false,
            state.isRemember = false
        },
        onSetToken: (state: AuthState, {payload}) => {
            state.access_token = payload.access_token
            state.tokenExpiration = expiredTime(payload.expired_in)
        },
    },
    extraReducers: builder => {
        builder.addCase(authRequestToken.fulfilled, (state, action) => {
            state.access_token = action.payload.access_token
            state.tokenExpiration = expiredTime(action.payload.expired_in)
        })
    }
})

export const {reducer: authReducer, actions: authActions} = authSlice




