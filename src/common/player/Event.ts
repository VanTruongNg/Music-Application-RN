import TrackPlayer, { RepeatMode } from "react-native-track-player";

export const checkRepeatMode = async(callback: (mode: RepeatMode) => void) => {
    const repeatMode = await TrackPlayer.getRepeatMode()

    if (repeatMode === RepeatMode.Off) {
        callback(RepeatMode.Off)
      } else if (repeatMode === RepeatMode.Queue) {
        callback(RepeatMode.Queue)
      } else {
        callback(RepeatMode.Track)
      }
}

export const setRepeatMode = (mode: 'Off' | 'Track' | 'Queue') => {
    TrackPlayer.setRepeatMode(RepeatMode[mode])
  }