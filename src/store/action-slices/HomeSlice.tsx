import { createSlice } from "@reduxjs/toolkit"
import { HomeDataItemFields } from "src/models/API"
import { getFeaturedPlaylist, getHomePlaylist } from "../action-thunk/HomeThunk"
import { uniqBy } from 'lodash'
import { TrackDataFields } from "src/models/Track"

export interface HomeStateType {
    homedata: {
        items: HomeDataItemFields[]
        total: number
    }
    playlist: {
        items: HomeDataItemFields[]
        total: number
    }
}

const initialState: HomeStateType = {
    homedata: {
        items: [],
        total: 0,
      },
      playlist: {
        items: [],
        total: 0,
      },
}

export const formatSearchData = (item: TrackDataFields)=> {
    const albumImage = item?.album?.images[0]?.url ?? ''
    const trackName = item?.name ?? ''
    const trackId = item?.id ?? ''
    const artistName = item?.artists[0]?.name ?? ''
    const artistId = item?.artists[0]?.id
    const album = item?.album
    const trackUrl = item?.external_urls.spotify
    const playUrl = item?.url ?? ''

    return {
        albumImage,
        trackName,
        trackId,
        artistName,
        artistId,
        album,
        trackUrl,
        playUrl
    }
} 


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},

    extraReducers: builder => {
        builder.addCase(getHomePlaylist.fulfilled, (state, action) => {
            const {items, total, offset} = action.payload?.playlists
            if (offset === 0){
                state.homedata.items = items
                state.homedata.total = total
            } else {
                const uniqueItems = uniqBy(items, 'item.id')
                state.homedata.items = [...state.homedata.items, ...uniqueItems]
            }
        })
        builder.addCase(getFeaturedPlaylist.fulfilled, (state,action) => {
            const {items, total} = action.payload?.playlists
            state.playlist.items = items
            state.playlist.total = total
        })
    },
})

export const {reducer: homeReducer, actions: homeActions} = homeSlice