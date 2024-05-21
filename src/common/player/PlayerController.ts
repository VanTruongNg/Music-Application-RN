import TrackPlayer from "react-native-track-player"
import { PlayerProps } from "./type"
import { playerControlActionSaga } from "src/store/action-saga/PlayerControlSaga"
import { dispatch } from "../redux"
import { fetchAudioSagaAction } from "src/store/action-saga/FetchAudioSaga"
import { TrackDataFields } from "src/models/Track"
import { formatSearchData, playerActions } from "src/store/action-slices"

const ANDROID_HEAD_PATH = 'file://'

export const startAudio = async (info: PlayerProps) => {
    if (info.from !== 'home') {
        await TrackPlayer.reset()
        await dispatch (
            playerControlActionSaga.setCurrentTrack({PlayerProps: info})
        )
    }

    await dispatch(
        fetchAudioSagaAction.fetch({
            callback: async TrackInfo => {
                if (typeof TrackInfo === 'string') return
                await addPlaylist(TrackInfo)
            }
        })
    )
}

export const startPlaylist = async (queue: TrackDataFields[]) => {
    await TrackPlayer.reset()
    await dispatch(playerActions.onResetQueue(queue))
    await startAudio({from: 'queue', info: queue[0]})
    await TrackPlayer.setPlayWhenReady(true)
}

/**
 * Function to handle track switching
 * @param options - 'next' or 'previous' option
 */
export const onSwitchTrack = async(options: 'next' | 'previous') => {
    await dispatch(
        playerControlActionSaga.onChangeCurrentTrack({
            ChangeTrackProps: {
                option: options,
                callback: async TrackInfo => {
                    if (typeof TrackInfo === 'string') return
                    await addPlaylist(TrackInfo)
                    await skipToNext(TrackInfo)
                }
            }
        })
    )
}

const skipToNext = async (TrackInfo: any) => {
    const currentQueue = await TrackPlayer.getQueue()
    if (TrackInfo.id === currentQueue[0].id) {
        await TrackPlayer.skip(0)
    } else {
        await TrackPlayer.skipToNext()
    }
    await TrackPlayer.setPlayWhenReady(true)
}

export const addPlaylist = async (info: TrackDataFields) => {
    const { playUrl, trackName, trackId, artistName } = formatSearchData(info)
    const addTrack = {
      id: trackId,
      url: playUrl,
      title: trackName,
      artist: artistName,
    }
  
    const currentQueue = await TrackPlayer.getQueue()
    const isAlready = currentQueue.find(item => item.id === trackId)
  
    if (!isAlready) {
      await TrackPlayer.add(addTrack)
    } else {
      return
    }
}