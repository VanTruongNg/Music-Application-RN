import React from "react"
import { TouchableOpacity } from "react-native"
import { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"
import Animated from "react-native-reanimated"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import { FULLSCREEN_HEIGHT } from "src/themes/Constants"

interface SkipButtonProps {
    direction: 'next' | 'previous'
    switchTrack: () => void
    translationY: SharedValue<number>
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedVector = Animated.createAnimatedComponent(FontAwesome6)

const IconHeight = scale(22)
const IconWidth = scale(24)

const SkipButton: React.FC<SkipButtonProps> = React.memo(
    ({direction, switchTrack, translationY}) => {
        const iconName = direction === 'previous' ? 'backward-step' : 'forward-step'

        const animatedStylez = useAnimatedStyle(() => {
            const scale = interpolate(
                translationY.value,
                [0, -FULLSCREEN_HEIGHT],
                [1,1],
                'clamp'
            )

            return {transform: [{scale}]}
        })

        const iconSize = useAnimatedStyle(() => {
            const scale = interpolate(
                translationY.value,
                [0, -FULLSCREEN_HEIGHT],
                [1, IconHeight / 50],
                'clamp'
            )

            return {
                fontSize: 50,
                transform: [{scale}]
            }
        })

        return (
            <AnimatedButton onPress={switchTrack} style={[animatedStylez]}>
                <AnimatedVector 
                    name={iconName}
                    style={iconSize}
                    color={Colors.white.default}
                />
            </AnimatedButton>
        )
    }
)

export default SkipButton