import { useEffect, useRef } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { useScreenController } from "src/common/hooks"
import { useAppSelector } from "src/common/redux"
import { scale } from "src/common/scale"
import { Container } from "src/components/container"
import { BackHeader } from "src/components/header"
import { LoadMoreList } from "src/components/list"
import { AlbumParams } from "src/models/Album"
import { getArtistAlbum } from "src/store/action-thunk"
import { ArtistAlbumItem } from "./components"

type Props = {}

const AlbumListScreen = (props: Props) => {
    const {dispatch, navigation, route} = useScreenController()
    const {artistAlbum} = useAppSelector(state => state.artist)

    const flatlistRef = useRef<FlatList>(null)

    const params = route?.params?.item

    useEffect(() => {
        console.log("Item: ", params)
    },[params])

    useEffect(() => {
        onGetData()
    }, [])

    const onGetData = (page = 0) => {
        dispatch(getArtistAlbum({id: params.id, offset: page}))
    }

    const onGoAlbumScreen = (item: AlbumParams) => {
        navigation.push({
            name: 'AlbumScreen',
            params: {
                item
            }
        })
    }

    return (
        <Container>
            <BackHeader title="Bản phát hành"/>

            <LoadMoreList
                flatListRef={flatlistRef}
                data={artistAlbum.items}
                onEndReachedThreshold={0.5}
                onGetData={page => onGetData(page)}
                totalPages={artistAlbum.total}
                ItemSeparatorComponent={() => <View style={styles.divider}/>}
                style={styles.item}
                renderItem={({item}: any) => (
                    <ArtistAlbumItem item={item} onGoAlbumScreen={onGoAlbumScreen}/>
                )}
                renderHeader={() => <View style={styles.header}/>}
            />
        </Container>
    )
}

export default AlbumListScreen

const styles = StyleSheet.create({
    divider: {
      height: scale(20),
    },
    item: {
      paddingHorizontal: scale(10),
    },
    header: {
      height: scale(15),
    },
})