import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AlertProps } from "src/components/alert/type"
import { AppState } from "src/models/App"
import { appInit } from "../action-thunk"

const initialState: AppState = {
    firstTimeLauch: true,
    loadingApp: false,
    handleAlert: {
        isShowAlert: false
    },
    showToastMessage: false,
    language: 'vi',
    theme: 'dark',
    env: null
}

const appSlice = createSlice ({
    name: 'app',
    initialState,
    reducers: {
        onFirstTimeLaunch: state => {
            state.firstTimeLauch = false
        },
        onSetLanguage: (state, {payload}) => {
            state.language = payload
        },
        onSetLoadApp: (state, {payload}) => {
            state.loadingApp = payload
        },
        onShowAlert: (state: AppState, {payload}: PayloadAction<AlertProps>) => {
            state.handleAlert= payload
        },
        onHideAlert: (state: AppState) => {
            state.handleAlert = {
              isShowAlert: false,
            };
          },
        onShowToast: (state: AppState) => {
            state.showToastMessage = true;
        },
    },
    extraReducers: builder => {
        builder.addCase(appInit.fulfilled, (state,action) => {
            state.env = action.payload
        })
    }
})


export const {reducer: appReducer, actions: appActions} = appSlice

