import React, { useEffect, useState } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import Animated, { SharedValue, interpolate, useAnimatedStyle } from "react-native-reanimated"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { checkRepeatMode, setRepeatMode, } from "src/common/player"
import { RepeatMode } from "react-native-track-player"
import { scale } from "src/common/scale"
import { FULLSCREEN_HEIGHT } from "src/themes/Constants"
import Colors from 'src/themes/Colors'

interface ShuffleRepeatButtonProps {
    option: 'shuffle' | 'repeat'
    translationY?: SharedValue<number>
    size?: number
}

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome6)

const IconHeight = scale(22)
const IconWidth = scale(26)

const ShuffleRepeatButton: React.FC<ShuffleRepeatButtonProps> = React.memo(
    ({ option, translationY, size = scale(20) }) => {
    const [applyOption, setState] = useState(false)
  
    const onPressRepeat = () => {
        checkRepeatMode(mode => {
        if (mode === RepeatMode.Off) {
            setRepeatMode('Track')
            setState(true);
        } else {
            setRepeatMode('Off')
            setState(false)
        }
        })
    }
  
    const getRepeatMode = () => {
        checkRepeatMode(mode => {
          if (mode === RepeatMode.Off) {
            setState(false)
          } else {
            setState(true)
          }
        })
      }
  
    const onPressShuffle = async () => {
        setState(prev => !prev)
    }
  
    const optionPress = option === 'shuffle' ? onPressShuffle : onPressRepeat;
    const iconName = option === 'shuffle' ? 'shuffle' : 'repeat';
  
    useEffect(() => {
        getRepeatMode()
    }, [])
  
    const animatedStylez = useAnimatedStyle(() => {
        if (!translationY) return {}
  
        const height = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [0, IconHeight],
            'clamp',
        )
        const width = interpolate(
            translationY.value,
            [0, -FULLSCREEN_HEIGHT],
            [0, IconWidth],
            'clamp',
        )
  
        return {
            height,
            width,
        }
    })
  
    return (
        <AnimatedButton
            onPress={optionPress}
            style={[animatedStylez, styles.container]}>
            {!applyOption ? (
                <AnimatedIcon
                name={iconName}
                size={size}
                color={Colors.white.default}
                />
            ) : (
                <AnimatedIcon
                name={iconName}
                size={size}
                color={Colors.green.default}
                />
            )}
        </AnimatedButton>
      )
    }
)

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default ShuffleRepeatButton

