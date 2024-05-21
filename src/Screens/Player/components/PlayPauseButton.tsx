import React from "react";
import { WaveIndicator } from "react-native-indicators";
import Animated, { FadeIn, FadeOut, interpolate, useAnimatedStyle } from "react-native-reanimated";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { SharedValue } from "react-native-reanimated";
import { usePlayerState } from "src/common/hooks";
import TrackPlayer from "react-native-track-player";
import Constants, { FULLSCREEN_HEIGHT } from "src/themes/Constants";
import Colors from "src/themes/Colors";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { scale } from "src/common/scale";

const AnimatedIcon = Animated.createAnimatedComponent(WaveIndicator)
const AnimatedVector = Animated.createAnimatedComponent(FontAwesome6)

export const PlayPauseButton = React.memo(
    ({buffering = false,
        translationY
    }:{
        buffering: boolean,
        translationY: SharedValue<number>
    }) => {
        const {isPlaying, isEnded, isPaused, isReady} = usePlayerState()

        const play = async() => {
            if (isEnded) {}
            else if (isPaused || isReady) {
                await TrackPlayer.play()
            }
        }
        const animatedStyle = useAnimatedStyle(() => {
            const scale = interpolate (
                translationY.value,
                [0, -FULLSCREEN_HEIGHT],
                [1.5, 1],
                'clamp'
            )

            return {
                transform: [{scale}]
            }
        })

        const iconStylez = useAnimatedStyle(() => {
            return {
                fontSize: Constants.scale15
            }
        })

        return buffering ? (
            <View>
                <AnimatedIcon style={animatedStyle} color={Colors.white.default} />
            </View>
        ) : (
            <TouchableOpacity onPress={isPlaying ? TrackPlayer.pause : play}>
                <Animated.View
                    style={[styles.container, animatedStyle]}
                    entering={FadeIn.duration(500)}
                    exiting={FadeOut}>
                    <AnimatedVector 
                        style={[{marginLeft: isPlaying ? scale(0) : scale(2)},
                        iconStylez
                        ]}
                        name={isPlaying ? "pause" : "play"}
                        color={Colors.black.default}
                    />
                </Animated.View>
            </TouchableOpacity>
        )
    }
)

const styles = StyleSheet.create({
    container: {
      height: scale(50),
      width: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white.default,
      borderRadius: scale(25),
    }
})