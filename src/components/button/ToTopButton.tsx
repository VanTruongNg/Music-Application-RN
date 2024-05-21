import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated"
import { StyleSheet, TouchableHighlight } from "react-native"
import { scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import  Icon  from "react-native-vector-icons/MaterialIcons"
import Layout from "src/themes/Layout"
import { ButtonProps } from "./type"
import { memo } from "react"
import equals from 'react-fast-compare'

const ToTopButtonComponent = (props: ButtonProps) => {
    const {style, onPress, translationY}= props
    
    const stylez = useAnimatedStyle (() => {
        if (translationY) {
            const opacity = interpolate(
                translationY?.value,
                [2000,2040],
                [0,1],
                'clamp'
            )
            return {
                opacity
            }
        }
        return {
            opacity:0
        }
    })

    return (
        <Animated.View
            style={[
                styles.container,
                style,
                stylez,
            ]}>
                <TouchableHighlight
                    style={[styles.button, Layout.center]}
                    onPress={onPress}>
                        <Icon 
                            name="arrow-upward"
                            size={scale(22)}
                            color={Colors.white.default}
                        />
                </TouchableHighlight>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 999,
      right: scale(16),
    },
    button: {
      backgroundColor: Colors.green.default,
      width: scale(40),
      height: scale(40),
      borderRadius: scale(20),
    },
});

export const ToTopButton = memo (ToTopButtonComponent, equals)
