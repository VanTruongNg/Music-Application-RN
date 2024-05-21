import { TouchableOpacity, StyleSheet, FlatList, View } from "react-native"
import { fontScale, scale } from "src/common/scale"
import { AlbumDataItemFields } from "src/models/Album"
import Layout from "src/themes/Layout"
import Colors from "src/themes/Colors"
import { AnimatedImage } from "src/components/image"
import { BoldText } from "src/components/text"
import { Spacer } from "src/components/spacer"

type Props = {
    item: any
    data: AlbumDataItemFields[]
    onGoPlaylist: (item: {id: string}) => void
}

const RenderItem = ({
    item, 
    onGoPlaylist
}: {
    item: AlbumDataItemFields
    onGoPlaylist: (item: {id: string}) => void
}) => {
    return (
        <TouchableOpacity
            onPress={() => onGoPlaylist(item)}
            style={[Layout.colCenter, styles.container]}
            activeOpacity={0.6}>
            <AnimatedImage 
                source={{uri: item?.images[0]?.url}}
                containerStyle={styles.image}
            />
            <BoldText numberOfLines={1} textStyle={styles.name}>
                {item?.name}
            </BoldText>
        </TouchableOpacity>
    )
}

const FeatureListItem = ({data, item, onGoPlaylist}: Props) => {
    const HeaderList = (name: string) => {
        return <BoldText textStyle={styles.header}>{name}</BoldText>
    }

    return (
        <>
            {data.length > 0 && HeaderList(item.name)}
            <FlatList
                data={data}
                initialNumToRender={5}
                renderItem={({item}: any) => (
                    <RenderItem item={item} onGoPlaylist={onGoPlaylist}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={styles.divider}/>}
                horizontal
            />

            <Spacer size={scale(60)}/>
        </>
    )
}

export default FeatureListItem

const styles = StyleSheet.create({
    container: {
      width: scale(120),
      justifyContent: 'flex-start',
    },
    header: {
      fontSize: fontScale(20),
      marginBottom: scale(15),
    },
    image: {
      width: scale(120),
      height: scale(120),
      overflow: 'hidden',
    },
    divider: {
      width: scale(15),
    },
    name: {
      fontSize: fontScale(14),
      color: Colors.white.default,
      marginTop: scale(5),
      textAlign: 'center',
    },
})