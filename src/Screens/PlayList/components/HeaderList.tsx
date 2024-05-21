import { memo } from "react"
import isEqual from "react-fast-compare"
import { View, StyleSheet } from "react-native"
import { fontScale, scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import { PlaylistDataItemFields } from "src/models/Playlist"
import Layout from "src/themes/Layout"
import LinearGradient from "react-native-linear-gradient"
import { RegularText } from "src/components/text"
import { formatNumber } from "src/common/helper"
import { translate } from "src/common/language/translate"
import Divider from "src/components/divider"
import ShuffleRepeatButton from "src/Screens/Player/components/ShuffleRepeatButton"

type Props = {
    info: PlaylistDataItemFields
    bgColor: string
}


const HeaderListComponent = ({ bgColor, info }: Props) => {
    return (
      <View style={styles.wrapper}>
        <LinearGradient colors={[bgColor, 'black']} style={styles.gradient} />
        <View style={[styles.container]}>
          <View style={styles.wrapInfo}>
            <View style={[Layout.rowVCenter]}>
              <RegularText textStyle={styles.follower}>
                {formatNumber(info?.followers.total ?? 0)} -{' '}
                {translate('search:folower')}
              </RegularText>
            </View>
          </View>
  
          <View style={[Layout.rowBetween]}>
            <View />
            <View style={[Layout.rowVCenter, { gap: scale(20) }]}>
              <ShuffleRepeatButton option="shuffle" size={scale(18)} />
              <Divider width={scale(30)} />
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
    artist: {
      fontSize: fontScale(12),
      paddingHorizontal: scale(5),
    },
    albumType: {
      fontSize: fontScale(14),
      paddingHorizontal: scale(2),
    },
    wrapInfo: {
      marginTop: scale(10),
      gap: scale(4),
    },
    img: {
      width: scale(15),
      height: scale(15),
      borderRadius: scale(15 / 2),
      marginLeft: scale(2),
    },
    follower: {
      color: Colors.white.default,
      marginTop: scale(8),
    },
})
  