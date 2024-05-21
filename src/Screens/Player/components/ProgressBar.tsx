import Slider, { SliderProps } from "@react-native-community/slider";
import { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { FULLSCREEN_HEIGHT } from "src/themes/Constants";
import Animated from "react-native-reanimated";
import Colors from "src/themes/Colors";
import { StyleSheet, View, Text } from "react-native";
import { kWidth } from "src/common/constants";
import { scale } from "src/common/scale";
import { Spacer } from "src/components/spacer";
import { memo } from "react";
import isEqual from "react-fast-compare";

interface Props extends SliderProps {
    translationY: SharedValue<number>
}

const formatSeconds = (time: number) => new Date(time * 1000).toISOString().slice(14,19)

const ProgressBarComponent = ({translationY, ...props}: Props) => {
    const {position, duration, buffered} = useProgress()

    const forceValuePosition = position >= duration ? 0 : position

    const stylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [-10, 1],
            'clamp'
        )
        return {opacity}
    })

    return (
        <Animated.View style={[styles.container, stylez]}>
            <>
                <Slider 
                    style ={styles.slider}
                    value={forceValuePosition}
                    minimumValue={0}
                    maximumValue={duration}
                    thumbTintColor={Colors.white.default}
                    minimumTrackTintColor={Colors.white.default}
                    maximumTrackTintColor={Colors.white.default}
                    onSlidingComplete={TrackPlayer.seekTo}
                    {...props}
                />

                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>
                        {formatSeconds(forceValuePosition)}
                    </Text>
                    <Spacer mode={'expand'}/>
                    <Text style={styles.labelText}>
                        {formatSeconds(Math.max(0, duration - forceValuePosition))}
                    </Text>
                </View>
            </>
        </Animated.View>
    )
}

export const ProgressBar = memo(ProgressBarComponent, isEqual)

const styles = StyleSheet.create({
    slider: {
      width: kWidth - scale(15),
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      marginTop: scale(10),
      marginLeft: scale(20),
    },
    labelContainer: {
      flexDirection: 'row',
      marginHorizontal: scale(3),
    },
    labelText: {
      color: Colors.white.default,
    },
  })