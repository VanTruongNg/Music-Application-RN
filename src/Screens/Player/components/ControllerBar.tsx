import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated"
import { kWidth } from "src/common/constants"
import { scale } from "src/common/scale"
import Constants, { FULLSCREEN_HEIGHT } from "src/themes/Constants"
import { StyleSheet, View } from "react-native"
import ShuffleRepeatButton from "./ShuffleRepeatButton"
import SkipButton from "./SkipButton"
import { PlayPauseButton } from "./PlayPauseButton"
import { memo } from "react"
import isEqual from "react-fast-compare"

interface Props {
    buffering: boolean
    switchTrack: (option: 'next' | 'previous') => void
    translationY: any
}
const scaleSize115 = scale(115)
const scaleSize135 = scale(142)

const ControllerBarComponent = ({
    buffering,
    switchTrack,
    translationY
}:Props) => {
    const containerStylez = useAnimatedStyle(() => {
        const translateY = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [-scaleSize135, 0],
            'clamp'
        )

        const translateX = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [scaleSize115, 2],
            'clamp'
        )

        const  initScale = kWidth / 3 / (kWidth - Constants.scale40)

        const scale = interpolate (
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [initScale, 1],
            'clamp'
        )

        return {
            transform: [{translateY}, {translateX}, {scale:scale}],
            width: kWidth - Constants.scale40,
            alignSelf: 'center'
        }
    })

    return (
        <Animated.View style={containerStylez}>
            <View style={styles.container}>
                <ShuffleRepeatButton option="shuffle" translationY={translationY} />
                <SkipButton
                    direction="previous"
                    switchTrack={() => switchTrack('previous')}
                    translationY={translationY}
                />
                <PlayPauseButton buffering={buffering} translationY={translationY} />
                <SkipButton
                    direction="next"
                    switchTrack={() => switchTrack('next')}
                    translationY={translationY}
                />
                <ShuffleRepeatButton option="repeat" translationY={translationY} />
            </View>
        </Animated.View>
    )
}


export const ControllerBar = memo(ControllerBarComponent, isEqual)

const styles = StyleSheet.create({
    container: {
      height: scale(50),
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
})