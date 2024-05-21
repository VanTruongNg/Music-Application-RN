import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { StatusBar, View, StyleSheet } from "react-native"
import { Blurhash } from "react-native-blurhash"
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, State, useTrackPlayerEvents } from "react-native-track-player"
import { getBackGroundPlayer, getBlurhashColor } from "src/common/helper"
import { onSwitchTrack, startAudio } from "src/common/player"
import { useAppSelector } from "src/common/redux"
import { scale } from "src/common/scale"
import { formatSearchData } from "src/store/action-slices"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"
import { ControllerBar, Header, ProgressBar, TrackImage, TrackInfo } from "./components"


const event = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackActiveTrackChanged,
    Event.PlaybackQueueEnded
]

const PlayerScreen = ({route, translationY}: any) => {
    const {currentTrack, trackQueue} = useAppSelector(state => state.player)
    const [buffering, setBuffering] = useState(true)
    const [bgColor, setBgColor] = useState('')

    const {albumImage, trackName, artistName} = formatSearchData (currentTrack)

    useLayoutEffect(() => {
        getBgColor()
    }, [albumImage])

    const getBgColor = useCallback(async () => {
        const bgColor = await getBackGroundPlayer(albumImage)
        const blurHashColor = 
            bgColor !== Colors.grey.player ? await getBlurhashColor(albumImage) : false
        setBgColor(blurHashColor || bgColor || Colors.grey.player) 
    }, [albumImage])

    const initPlayer = async () => {
        await startAudio({info: currentTrack, from: 'home'})
        registerEventListener()
    }

    useEffect(() => {
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
        initPlayer()
    }, [])

    const switchTrack = useCallback(async (option: 'next' | 'previous') =>{
        if (trackQueue.length > 0){
            setBuffering(true)
            await onSwitchTrack (option)
            setBuffering(false)
        }
    }, [])

    useTrackPlayerEvents (event, async event => {
        if (event.type === Event.PlaybackError) {
            console.log('An error occurred while playing the current track')
            TrackPlayer.retry()
        } else if (event.type === Event.PlaybackState) {
            if (event.state === State.Buffering || event.state === State.Loading) {
                setBuffering(true)
            } else if (event.state === State.Ready) {
                setBuffering(false)
            } else if (event.state === State.Ended){
                switchTrack('next')
            }
        } else if  (event.type === Event.PlaybackActiveTrackChanged && event.track){
            await TrackPlayer.updateOptions({
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],
                android: {
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
                },
                icon: require('src/assests/images/Spotify_Logo.png'),
                nextIcon: require('src/assests/images/Spotify_Logo.png'),
                color: 0xffff0000
            })
        }
    })

    const registerEventListener = () => {
        TrackPlayer.addEventListener(Event.RemoteNext, ()=>switchTrack('next'))
        TrackPlayer.addEventListener(Event.RemotePrevious, ()=>switchTrack('previous'))
    }

    const FragmentView = bgColor === Colors.grey.player ? (
        <View style={[styles.defaultBackground, { backgroundColor: bgColor}]} />
    ): (
        <View style={styles.blurHashBackground}>
            <Blurhash blurhash={bgColor} style={Layout.fill}/>
        </View>
    )

    return !bgColor ? (
        <></>
    ):(
        <>
            {FragmentView}
            <View>
                <Header translationY={translationY}/>
                <TrackImage 
                    trackQueue={trackQueue}
                    currentTrack={currentTrack}
                    translationY={translationY}
                    switchTrack={option => switchTrack(option)}
                />
                <TrackInfo TrackInfo={currentTrack} translationY={translationY}/>
                <ProgressBar translationY={translationY}/>
                <ControllerBar 
                    translationY={translationY}
                    buffering={buffering}
                    switchTrack={option => switchTrack(option)}
                />
            </View>
        </>
    )
}

export default PlayerScreen

const styles = StyleSheet.create({
    progessBar: {
      height: scale(50)
    },
    blurHashBackground: {
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1
    },
    defaultBackground: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
  })