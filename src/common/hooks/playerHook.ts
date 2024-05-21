import { usePlaybackState, State } from "react-native-track-player"

export const usePlayerState = () => {
    const playerState = usePlaybackState()

    return {
        isPlaying: playerState.state === State.Playing,
        isEnded: playerState.state === State.Ended,
        isReady: playerState.state === State.Ready,
        isBuffering: playerState.state === State.Buffering,
        isPaused: playerState.state === State.Paused,
        isStopped: playerState.state === State.Stopped
    }
}