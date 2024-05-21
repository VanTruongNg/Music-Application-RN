import { memo } from "react"
import isEqual from "react-fast-compare"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { getYear } from "src/common/helper"
import { translate } from "src/common/language/translate"
import { fontScale, scale } from "src/common/scale"
import { AnimatedImage } from "src/components/image"
import { BoldText, MediumText } from "src/components/text"
import { Album, AlbumParams } from "src/models/Album"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"

type Props = {
    onGoAlbumScreen: (item: AlbumParams) => void
    item: Album
}

const ArtistAlbumItemComponent = ({item, onGoAlbumScreen}: Props) => {
    return (
        <TouchableOpacity
        style={[Layout.rowVCenter]}
        activeOpacity={0.6}
        onPress={() => 
            onGoAlbumScreen({
                album: '',
                id: item?.id,
                name: item?.name
            })
        }>
            <AnimatedImage
                containerStyle={styles.image}
                source={{uri: item?.images[1].url}}
            />
            <View style={[Layout.colVCenter, styles.wrapInfo]}>
                <BoldText numberOfLines={1} textStyle={styles.name}>
                    {item?.name}
                </BoldText>
                <MediumText textStyle={styles.albumType}>
                    {`${getYear(item?.release_date)} - ${translate(`album:${item.album_type}`)}`}
                </MediumText>
            </View>
        </TouchableOpacity>
    )
}

export const ArtistAlbumItem = memo(ArtistAlbumItemComponent, isEqual)

const styles = StyleSheet.create({
    image: {
        width: scale(80),
        height: scale(80)
    },
    albumType: {
        color: Colors.unActive,
        fontSize: fontScale(14)
    },
    name: {
        fontSize: fontScale(16)
    },
    wrapInfo: {
        gap: scale(2),
        marginLeft: scale(8),
        overflow: 'hidden',
        flex: 1
    }
})