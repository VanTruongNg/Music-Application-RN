import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetHomePlaylistFields, GetHomePlaylistResponseFields, GetSearchDataFields, GetSearchDataResponseFields } from "src/models/API";
import { NetWorkService } from "src/networking/RestfulAPI";
import { endpoints } from "src/networking/endpoint";

export const getHomePlaylist = createAsyncThunk<
    GetHomePlaylistResponseFields,
    GetHomePlaylistFields
>('home/getHomePlaylist', async fields => {
    const response = await NetWorkService.Get<GetHomePlaylistResponseFields>({
        url: endpoints.home.getPlaylist.replace(
            '$type_id',
            fields.category_id.toString()
        )
    })
    console.log(response)
    return response
})

export const getFeaturedPlaylist = createAsyncThunk<GetHomePlaylistResponseFields> (
    'home/getFeaturedPlaylist',
    async fields => {
        const response = await NetWorkService.Get<GetHomePlaylistResponseFields>({
            url: endpoints.home.getFeaturedPlaylist
        })
        console.log(response)
        return response
    }
)

export const getSearchData = createAsyncThunk<
    GetSearchDataResponseFields,
    GetSearchDataFields
>('home/getSearchData', async fields => {
    const response = await NetWorkService.Get<GetHomePlaylistResponseFields> ({
        url: endpoints.home.search
        .replace(/\$keyword/g, fields.keyword.toString())
        .replace(/\$type/g, fields.type.toString())
        .replace('$offset', fields.offset.toString())
    })
    return {
        ...response,
        keyword: fields.keyword.toString(),
        offset: fields.offset
    }
})