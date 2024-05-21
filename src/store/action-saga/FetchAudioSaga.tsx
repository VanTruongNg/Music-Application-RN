import { createAction } from "@reduxjs/toolkit";
import { call, put, race, take, delay, takeLatest } from "redux-saga/effects";
import { downloadTrack } from "src/common/player";
import { selector } from "src/common/redux";
import { TrackDataFields } from "src/models/Track";
import { NetWorkService } from "src/networking/RestfulAPI";
import { playerControlActionSaga } from "./PlayerControlSaga";
import { playerActions } from "../action-slices";

function* fetchAudioWorker (
    action: ReturnType<typeof fetchAudioSagaAction.fetch>
): Generator<any> {
    const env: any = yield selector (state => state.app.env)
    const TrackInfo: any = yield selector (state => state.player.currentTrack)

    const fetchApi = () => 
        NetWorkService.Get({
            url: `?track=${TrackInfo.external_urls.spotify}`,
            baseUrl: env?.DOWNLOAD_URL ?? '',
            isNeedToken: false
        })

    try {
        const {trackFilePath, cancel}: any = yield race ({
            trackFilePath: call(downloadTrack, TrackInfo),
            cancel: take(playerControlActionSaga.onChangeCurrentTrack.type)
        })

        if (cancel) {
            return
        }

        console.log(trackFilePath)

        if (trackFilePath) {
            const TrackInfoWithUrl = {
                ...TrackInfo,
                url: trackFilePath
            }
            yield put (playerActions.onSetCurrentTrack(TrackInfoWithUrl))
            action.payload.callback?.(TrackInfoWithUrl)
        } else {
            const response: any = yield call(fetchApi);

            if (response && response?.youtubeVideo?.audio[0]?.url){
                const TrackInfoWithUrl = {
                    ...TrackInfo,
                    url: response.youtubeVideo.audio[0].url
                }

                yield delay(500)
                yield put(playerActions.onRemoveCurrentTrack(TrackInfoWithUrl))
                action.payload.callback?.(TrackInfoWithUrl)
                yield call(downloadTrack, TrackInfoWithUrl)
            }
        }
    }catch(e) {
        if (e === 'The key has expired'){
            alert('Bạn đã hết key')
            action.payload.callback?.(e)
        }else {
            console.log(e)
        }
    }
}

const fetch = createAction<{
    callback: (TrackInfo: TrackDataFields | string) => void;
  }>('fetch/fetchAudio')

export const fetchAudioSagaAction = {fetch}

export function* fetchSaga() {
    yield takeLatest(fetch.type, fetchAudioWorker);
}
  