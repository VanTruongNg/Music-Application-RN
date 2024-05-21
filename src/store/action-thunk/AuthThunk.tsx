import { createAsyncThunk } from "@reduxjs/toolkit";
import { TokenResponseFields, RequestTokenFields } from "src/models/Auth";
import { NetWorkService } from "src/networking/RestfulAPI";
import { endpoints } from "src/networking/endpoint";

export const authRequestToken = createAsyncThunk<
    TokenResponseFields,
    RequestTokenFields
>('auth/login', async (fields, { rejectWithValue }) => {
    try {
        const response = 
            await NetWorkService.PostFormUrlencoded<TokenResponseFields>({
                url: endpoints.auth.token,
                body: {
                    grant_type: 'client_credentials',
                    client_id: fields.client_id,
                    client_secret: fields.client_secret,
                },
                baseUrl: fields.baseUrl
            })

        console.log(response)
        return response
    }
    catch (err: any) {
        return rejectWithValue(err.data);
    }
})