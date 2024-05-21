import { memo } from "react"
import isEqual from "react-fast-compare"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { translate } from "src/common/language/translate"
import { scale } from "src/common/scale"
import { AnimatedImage } from "src/components/image"
import { Spacer } from "src/components/spacer"
import { BoldText, RegularText } from "src/components/text"
import Layout from "src/themes/Layout"

type Props = {
    item: {
        id: string,
        img: string,
        name: string,
        total: number
    }
    onNavigate: (data: {id: string 
                        name: string}) => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const PlaylistCardComponent = ({item, onNavigate}: Props) => {
    const scaleable = useSharedValue<number>(1)

    const onPressIN = () => {
        scaleable.value = withSpring(0.95)
    }

    const onPressOUT = () => {
        scaleable.value = withSpring(1)
    }

    const stylez = useAnimatedStyle(() => {
        const scale = interpolate(
            scaleable.value,
            [0.8, 1],
            [1.1, 1]
        )

        return {
            transform: [{scale}],
            paddingLeft: 5
        }
    })

    return (
        <AnimatedTouchableOpacity 
            onPressIn={onPressIN}
            onPressOut={onPressOUT}
            style={[Layout.rowVCenter, stylez]}
            activeOpacity={1}
            onPress={() => onNavigate({id: item.id, name: item.name})}
        >
            <AnimatedImage 
                source={item.img}
                resizeMode="cover"
                containerStyle={styles.img}
            />
            <View style={[Layout.colVCenter, styles.cardInfo]}>
                <BoldText>{item.name}</BoldText>
                <Spacer size={scale(5)}/>
                <RegularText>
                    {item.total} {translate('library:song').toLowerCase()}
                </RegularText>
            </View>
        </AnimatedTouchableOpacity>
    )
}

export const PlaylistCard = memo(PlaylistCardComponent, isEqual)

const styles = StyleSheet.create({
    img: {
        height: scale(50),
        width: scale(50)
    },
    cardInfo: {
        marginLeft: scale(10)
    }
})