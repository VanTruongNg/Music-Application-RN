import React, { memo, useCallback } from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Animated, { BounceIn, BounceOut, SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"
import { formatSearchData } from "src/store/action-slices"
import { addTrackToPlaylist, checkLoveTrack, removeTrackFromPlaylist } from "src/common/firebase"
import Toast from "react-native-toast-message"
import Constants, { FULLSCREEN_HEIGHT, MINIPLAYER_HEIGHT } from "src/themes/Constants"
import { fontScale, scale } from "src/common/scale"
import { kWidth } from "src/common/constants"
import { BoldText, RegularText } from "src/components/text"
import Colors from "src/themes/Colors"
import isEqual from "react-fast-compare"

interface Props {
    TrackInfo: any
    translationY: SharedValue<number>
}

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)
const AnimatedIcon1 = Animated.createAnimatedComponent(Ionicons)
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)

const TrackInfoComponent = ({TrackInfo, translationY}: Props) => {
    const [isLiked, setLiked] = React.useState(false)
    const {trackName, artistName} = formatSearchData(TrackInfo)

    const handleLikedPress = useCallback(() => {
        if (isLiked) {
            removeTrackFromPlaylist({data: TrackInfo, callback: () =>{}})
            setLiked(false)
            Toast.show({
                text1: 'Đã xoá khỏi danh sách',
                type: 'toastMessage',
            })
        } else {
            addTrackToPlaylist ({data: TrackInfo, callback: () => {}})
            setLiked(true)
            Toast.show({
                text1: 'Đã thêm vào danh sách yêu thích',
                type: 'toastMessage',
            })
        }
    }, [isLiked])

    checkLoveTrack (TrackInfo.id, bool => setLiked(bool))

    const nameStylez = useAnimatedStyle(() => {
        const fontSize = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [Constants.fontScale14, Constants.fontScale18],
            'clamp'
        )
        return {fontSize}
    })

    const artistStylez = useAnimatedStyle(() => {
        const fontSize = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [Constants.fontScale11,  Constants.fontScale14],
            'clamp'
        )
        return {fontSize}
    })

    const trackStylez = useAnimatedStyle(() => {
        const height = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [Constants.scale40, MINIPLAYER_HEIGHT],
            'clamp'
        )
        return {height}
    })

    const iconStylez = useAnimatedStyle(() => {
        const height = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [0, Constants.scale30],
            'clamp'
        )
        const width = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [0, Constants.scale30],
            'clamp'
        )
        return {height, width}
    })

    const containerStylez = useAnimatedStyle(() => {
        const translateY = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [-Constants.scale50, 0],
            'clamp'
        )

        const translateX = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [-Constants.scale25, 0],
            'clamp'
        )

        const maxWidth = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [kWidth / 2, kWidth - Constants.scale40],
            'clamp'
        )

        const marginTop = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [0, Constants.scale30],
            'clamp'
        )

        return {
            transform: [{translateY}, {translateX}],
            maxWidth,
            marginTop
        }
    })

    return (
        <Animated.View style={[styles.container, containerStylez]}>
            <View 
                style={{
                    height: MINIPLAYER_HEIGHT,
                    justifyContent: 'center',
                    paddingVertical: scale(5),
                    width: '85%'
                }}
            >
                <Animated.View style={[styles.trackInfo, trackStylez]}>
                    <BoldText numberOfLines={1} textStyle={nameStylez}>
                        {trackName}
                    </BoldText>
                    <RegularText numberOfLines={1} textStyle={artistStylez}>
                        {artistName}
                    </RegularText>
                </Animated.View>
            </View>

            <AnimatedButton 
                activeOpacity={1}
                onPress={handleLikedPress}
                style={[iconStylez, styles.icon]}>
                {!isLiked ? (
                    <AnimatedIcon1
                        name={'heart-outline'}
                        size={scale(26)}
                        color={'white'}
                        entering={BounceIn.duration(400)}
                    />
                ):(
                    <AnimatedIcon
                        name={'heart-sharp'}
                        size={scale(26)}
                        color={Colors.green.default}
                        exiting={BounceOut.duration(400)}
                        entering={BounceIn.duration(400)}
                    />
                )}
            </AnimatedButton>
        </Animated.View>
    )
}

export const TrackInfo = memo(TrackInfoComponent, isEqual)

const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      overflow: 'hidden',
    },
    trackInfo: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },
    artist: {
      fontSize: fontScale(12),
      marginTop: scale(2),
    },
    name: {
      fontSize: fontScale(18),
    },
    icon: {
      alignSelf: 'center',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
    },
})
