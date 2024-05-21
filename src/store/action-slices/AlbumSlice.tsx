import { createSlice } from "@reduxjs/toolkit";
import { AlbumState } from "src/models/Album";
import { getAlbumData, getSeveralArtists } from "../action-thunk";

const initialState: AlbumState ={
    albumData: {} as any
}

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase (getAlbumData.fulfilled, (state, action) => {
            state.albumData = action.payload
        })
        builder.addCase (getSeveralArtists.fulfilled, (state, action) => {
            state.albumData = {
                ...state.albumData,
                artists: action.payload.artists as any
            }
        })
    }
})

export const {reducer: albumReducer, actions: albumActions} = albumSlice