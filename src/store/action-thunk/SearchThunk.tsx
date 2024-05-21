import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetArtistAlbumResponsesFields, GetArtistInfoFields, GetSearchDataResponseFields, GetSeveralArtistInfoFields, GetSeveralArtistInfoResponseFields, GetTopTrackResponsesFields, GetTopTracksFields,getAlbumResponsesFields,getPlaylistResponseFields } from "src/models/API";
import { NetWorkService } from "src/networking/RestfulAPI";
import { endpoints } from "src/networking/endpoint";

interface ApiCall {
    key: string
    url: string
    id: string
}

export const getArtistData = createAsyncThunk<
    GetTopTrackResponsesFields,
    GetTopTracksFields
>('artist/getArtistData', async fields => {
    const apiCall: ApiCall[] =[
        {
            key: 'topTracks',
            id: 'tracks',
            url: endpoints.artist.topTrack.replace('$id', fields.id.toString())
        }, 
        {
            key: 'relatedArtist',
            id: 'artists',
            url: endpoints.artist.relatedArtist.replace('$id', fields.id.toString())
        },
        {
            key: 'relatedAlbum',
            id: '',
            url: endpoints.artist.relatedAlbum.replace('$id', fields.id.toString())
        },
        {
            key: 'artistAlbum',
            id: '',
            url: endpoints.artist.artistAlbum
                .replace('$id', fields.id.toString())
                .replace('$limit', fields.limit?.toString() ?? '10')
                .replace('$offset', fields.offset?.toString() ?? '0')
        }
    ]

    const response = await Promise.all(
        apiCall.map(apiCall => 
            NetWorkService.Get<GetTopTrackResponsesFields>({url: apiCall.url})
        )
    )

    const formatData = apiCall.reduce((result: any, apiCall, index) => {
        if (apiCall.key === 'topTracks') {
            result[apiCall.key] = response[index][apiCall.id]
            return result
        }
        result[apiCall.key] = apiCall.id ? response[index][apiCall.id] : response[index]
        return result
    }, {})

    return {...formatData, id: fields.id.toString()}
})

export const getArtistAlbum = createAsyncThunk<
    GetArtistAlbumResponsesFields,
    GetTopTracksFields    
>('artist/getArtistAlbum', async fields => {
    const response = await NetWorkService.Get<GetArtistAlbumResponsesFields> ({
        url: endpoints.artist.artistAlbum
            .replace('$id', fields.id.toString())
            .replace('$limit', fields.limit?.toString() ?? '10')
            .replace('$offset', fields.offset?.toString() ?? '0')
    })

    return response
})

export const getSeveralArtists = createAsyncThunk<
    GetSeveralArtistInfoResponseFields,
    GetSeveralArtistInfoFields
>('album/getSeveralArtists', async fields => {
    const idSperator = fields.ids.map(id => id.toString()).join('%2C')

    const response = await NetWorkService.Get<GetSearchDataResponseFields> ({
        url: endpoints.artist.getSeveralArtists.replace('$ids', idSperator)
    })

    return response
})

export const getArtistInfo = createAsyncThunk<
    GetSearchDataResponseFields,
    GetArtistInfoFields
>('artist/getArtistInfo', async fields => {
    const response = await NetWorkService.Get<GetSearchDataResponseFields>({
        url: endpoints.artist.getArtist
            .replace('$id', fields.id.toString())
    })

    return response
})

export const getAlbumData = createAsyncThunk<
    getAlbumResponsesFields,
    GetTopTracksFields
>('album/getAlbum', async fileds => {
    const response = await NetWorkService.Get<getAlbumResponsesFields>({
        url: endpoints.album.getAlbum.replace('$id', fileds.id.toString())
    })

    return {...response, id: fileds.id.toString()}
})

export const getPlaylistData = createAsyncThunk<
    getPlaylistResponseFields,
    GetTopTracksFields
>('playlist/getPlaylistData', async fields => {
    const response = await NetWorkService.Get<getPlaylistResponseFields> ({
        url: endpoints.playlists.getPlaylist.replace(
            '$id',
            fields.id.toString()
        )
    })

    return {...response, id:fields.id.toString()}
})