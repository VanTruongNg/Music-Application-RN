import { View } from "react-native"
import { fontScale, scale } from "src/common/scale"
import { AlbumDataItemFields } from "src/models/Album"
import { StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Layout from "src/themes/Layout"
import FastImage from "react-native-fast-image"
import { RegularText, SemiBoldText } from "src/components/text"
import { translate } from "src/common/language/translate"
import { getYear } from "src/common/helper"
import ShuffleRepeatButton from "src/Screens/Player/components/ShuffleRepeatButton"
import Divider from "src/components/divider"
import { memo } from "react"
import isEqual from "react-fast-compare"

type Props = {
    info: AlbumDataItemFields
    bgColor: string
}

const HeaderListComponent = ({bgColor, info}: Props) => {
    const showArtist = () => {
        if (info.artists.length > 1) {
            return `${info.artists[0].name} + ${info.artists.length -1}`
        }
        return info.artists[0].name
    }

    return (
        <View style={styles.wrapper}>
            <LinearGradient colors={[bgColor, 'black']} style={styles.gradient}/>
            <View style={styles.container}>
                <View style={styles.wrapInfo}>
                    <View style={[Layout.rowVCenter]}>
                        <FastImage
                            style={styles.img}
                            source={{uri: info.images[2].url}}
                        />
                        <SemiBoldText textStyle={styles.artist}>
                            {showArtist()}
                        </SemiBoldText>
                    </View>
                    <RegularText textStyle={styles.albumType}>
                        {`${translate(`album:${info.album_type === 'single' ? 'single' : 'album'}`)}
                            - ${getYear(info.release_date)}`}
                    </RegularText>
                </View>

                <View style={[Layout.rowBetween]}>
                    <View style={[Layout.rowVCenter, {gap: scale(20)}]}>
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
})