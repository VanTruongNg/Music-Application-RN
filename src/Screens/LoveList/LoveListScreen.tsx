import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useScreenController } from 'src/common/hooks'
import { getTrackFromPlayList } from 'src/common/firebase'
import { BackHeader } from './components';
import { RegularText } from 'src/components/text'
import { scale } from 'src/common/scale'
import { FloatingButton, HeaderList, TrackCard } from './components'
import { Spacer } from 'src/components/spacer'
import { startPlaylist } from 'src/common/player';
import { ScreenLoader } from 'src/components/loader'
import { searchActions } from 'src/store/action-slices'
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { AnimatedList } from 'src/components/list';

type Props ={}

const LoveListScreen = (props: Props) => {
    const {translate, route, dispatch} = useScreenController()
    const [listTrack, setListTrack] = useState<any>()
    const [totalItem, setTotalItem] = useState(0)

    const {id: playlistId, name} = route.params?.data

    const translationY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y
    })

    const openBottomModal = (item: any, position = 1) => {
        dispatch(searchActions.onSelectTrack({...item, position}))
    }

    getTrackFromPlayList(playlistId, ({data, totalItem}) => {
        setListTrack(data)
        setTotalItem(totalItem)
    })

    const onPlayQueue = () => {
        startPlaylist(listTrack)
    }

    return (
        <View style={styles.container}>
            <BackHeader title={name}/>

            <FloatingButton translationY={translationY} onPress={onPlayQueue}/>
            
            <View style={styles.body}>
                <RegularText>
                    {totalItem} {translate('library:song').toLowerCase()}
                </RegularText>

                <AnimatedList
                    data={listTrack}
                    onScroll={scrollHandler}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderHeader={() => <HeaderList />}
                    renderItem={({item}: any)=>(
                        <TrackCard
                            item={item}
                            onOpenModal={(item: any) => openBottomModal(item)}
                        />
                    )}
                    ItemSeparatorComponent={() => <Spacer size={scale(12)}/>}
                    renderFooter={() => <View style={styles.footer}/>}
                    ListEmptyComponent={
                        <View style={{marginTop: '40%'}}>
                            <ScreenLoader/>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

export default LoveListScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: {
      paddingHorizontal: scale(15),
      flex: 1,
      gap: scale(10),
    },
    footer: {
      height: scale(140),
    },
})