import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetRecommendFields, GetRecommendResponseFields } from "src/models/API";
import { NetWorkService } from "src/networking/RestfulAPI";
import { endpoints } from "src/networking/endpoint";

export const getRecommend = createAsyncThunk<
    GetRecommendResponseFields,
    GetRecommendFields
>('player/getRecommend', async fields => {
    const response = await NetWorkService.Get<GetRecommendResponseFields> ({
      url: endpoints.player.getRecommend
      .replace('$tracks', fields.tracks.toString())
      .replace('$artists', fields.artists.toString())
    })
    
    return response
})