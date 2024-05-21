import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import { formatFullDate } from "src/common/helper"
import { fontScale, scale } from "src/common/scale"
import { BoldText, SemiBoldText } from "src/components/text"
import { ArtistDataItemFields } from "src/models/Artist"
import Layout from "src/themes/Layout"

type Props = {
    artists: ArtistDataItemFields[]
    release_Date: string
    onGoArtistScreen: (artist: ArtistDataItemFields) => void
}

const RenderItem = ({
    item,
    onGoArtistScreen
}: {
    item: ArtistDataItemFields
    onGoArtistScreen: (artist: ArtistDataItemFields) => void
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onGoArtistScreen(item)}
            style={[Layout.rowVCenter, styles.item]}
        >   
            <FastImage
                style={styles.img}
                source={{uri: item?.images[2]?.url}}
                resizeMode="cover"
            />
            <SemiBoldText>{item?.name}</SemiBoldText>
        </TouchableOpacity>
    )
}

const ListArtist = ({artists, release_Date, onGoArtistScreen}: Props) => {
    const HeaderList = (date: string) => {
        return (
            <View style={styles.header}>
                <BoldText textStyle={styles.date}>{formatFullDate(date)}</BoldText>
            </View>
        )
    }

    return (
        <FlatList 
            renderItem={({item}) => (
                <RenderItem item={item} onGoArtistScreen={onGoArtistScreen}/>
            )}
            data={artists}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider}/>}
            ListHeaderComponent={() => HeaderList(release_Date)}
        />
    )
}

export default ListArtist

const styles = StyleSheet.create({
    header: {
        marginBottom: scale(15),
    },
    divider: {
        height: scale(10),
    },
    img: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
    },
    item: {
        gap: scale(10),
    },
    date: {
        fontSize: fontScale(16),
    },
})