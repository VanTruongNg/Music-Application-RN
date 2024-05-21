import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENVDynamic, ENVFields } from "src/common/config/env";
import { getRapidApiKey } from "src/common/firebase";
import { getMethodType, getValueFromStorage } from "src/common/storage";

export const appInit = createAsyncThunk('app/init', async()=> {
    let env: ENVFields | null = null
    const envConfig = getValueFromStorage(
        getMethodType.getString,
        'envConfig'
    )as string
    if (envConfig) {
        env = ENVDynamic(envConfig)
    }else {
        env = ENVDynamic('Dev')
    }

    const response = await getRapidApiKey({})

    return {...env, RAPID_API_KEY: response?.data()?.key || env?.RAPID_API_KEY}
})