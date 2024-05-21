import { createSlice } from "@reduxjs/toolkit";
import { PlaylistState } from "src/models/Playlist";
import { getPlaylistData } from "../action-thunk";

const initialState: PlaylistState ={
    playlistData: {} as any,
}

const playlistSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPlaylistData.fulfilled, (state, action) => {
          state.playlistData = action.payload;
        });
      },
})

export const {reducer: playlistReducer , actions: playlistAction} = playlistSlice