import { View, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { formatNumber } from "src/common/helper"
import { translate } from "src/common/language/translate"
import { scale } from "src/common/scale"
import { RegularText } from "src/components/text"
import Layout from "src/themes/Layout"
import Colors from "src/themes/Colors"
import ShuffleRepeatButton from "src/Screens/Player/components/ShuffleRepeatButton"
import Divider from "src/components/divider"
import { memo } from "react"
import isEqual from "react-fast-compare"

type Props = {
    follower: number
    bgColor: string
}

const HeaderListComponent = ({bgColor, follower}: Props) => {
    return (
        <View style={styles.wrapper}>
            <LinearGradient colors={[bgColor, 'black']} style={styles.gradient}/>
            <View style={[styles.container]}>
                <RegularText textStyle={styles.follower}>
                    {formatNumber(follower ?? 0)} - {translate('search:follower')}
                </RegularText>
                <View style={[Layout.rowBetween]}>
                    <View style={[Layout.rowVCenter, { gap: scale(20)}]}>
                        <ShuffleRepeatButton option="shuffle" size={scale(18)}/>
                        <Divider width={scale(30)}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const HeaderList = memo(HeaderListComponent, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: scale(10),
    },
    wrapper: {
        height: scale(80),
        width: '100%',
    },
    gradient: {
        flex: 1,
        opacity: 0.95,
        position: 'absolute',
        zIndex: -1,
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
    },
    follower: {
        color: Colors.white.default,
        marginTop: scale(8),
    },
})