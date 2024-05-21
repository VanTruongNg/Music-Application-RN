import { Image, TouchableOpacity, View, StyleSheet, FlatList } from "react-native"
import { getYear } from "src/common/helper"
import { translate } from "src/common/language/translate"
import { fontScale, scale } from "src/common/scale"
import { BoldText, MediumText } from "src/components/text"
import { Album, AlbumParams } from "src/models/Album"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"

type Props = {
    item: any, 
    data: Album[],
    onGoAlbumScreen: (item: AlbumParams) => void,
    onGoAlbumListScreen: () => void
}

const RenderItem = ({
    item,
    onGoAlbumScreen
}: {
    item: Album,
    onGoAlbumScreen: (item: AlbumParams) => void
}) => {
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
            <Image style={styles.image} source={{uri: item?.images[1].url}}/>
            <View style={[Layout.colVCenter, styles.wrapInfo]}>
                <BoldText numberOfLines={1} textStyle={styles.name}>
                    {item?.name}
                </BoldText>
                <MediumText textStyle={styles.albumType}>
                    {`${getYear(item?.release_date,)} - ${translate(`album:${item.album_type}`)}`}
                </MediumText>
            </View>
        </TouchableOpacity>
    )
}

const ArtistAlbumList = ({
    item,
    data,
    onGoAlbumScreen,
    onGoAlbumListScreen
}: Props) => {
    const HeaderList = (name: string) => {
        return <BoldText textStyle={styles.header}>{name}</BoldText>
    }

    const FooterList = () => {
        return (
            <TouchableOpacity
                onPress={onGoAlbumListScreen}
                style={[Layout.fill, Layout.center, styles.footer]}
                activeOpacity={0.6}
            >
                <BoldText textStyle={styles.footerLabel}>
                    {translate('album:showAllAlbum')}
                </BoldText>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }: any) => (
                <RenderItem item={item} onGoAlbumScreen={onGoAlbumScreen} />
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            ListHeaderComponent={() => HeaderList(item.name)}
            ListFooterComponent={FooterList}
        />
    )
}

export default ArtistAlbumList

const styles = StyleSheet.create({
    image: {
        width: scale(80),
        height: scale(80),
    },
    divider: {
        
    },
    header: {
        fontSize: fontScale(20),
        marginBottom: scale(15),
    },
    albumType: {
        color: Colors.unActive,
        fontSize: fontScale(14),
    },
    name: {
        fontSize: fontScale(16),
    },
    wrapInfo: {
        gap: scale(2),
        marginLeft: scale(8),
        overflow: 'hidden',
        flex: 1,
    },
    footer: {
        borderWidth: 0.5,
        borderColor: Colors.unActive,
        borderRadius: scale(10),
        marginHorizontal: '18%',
        marginTop: scale(15),
    },
    footerLabel: {
        textAlign: 'center',
        paddingVertical: scale(2),
    },
})