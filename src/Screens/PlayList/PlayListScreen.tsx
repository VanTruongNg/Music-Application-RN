import { StatusBar, StyleSheet, View } from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Layout from 'src/themes/Layout';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useScreenController } from 'src/common/hooks';
import { getPlaylistData } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { isIOS } from 'src/common/devices';
import Colors from 'src/themes/Colors';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import { ScreenLoader } from 'src/components/loader';
import { fontScale, scale } from 'src/common/scale';
import { Header_Distance } from 'src/components/header/AlbumBanner';
import {
  FeatureListItem,
  FloatingButton,
  HeaderList,
  PlayListData,
  TrackItem,
} from './components';
import { searchActions } from 'src/store/action-slices';
import { startAudio, startPlaylist } from 'src/common/player';
import TrackPlayer from 'react-native-track-player';
import { AnimatedList } from 'src/components/list';
import { PlaylistBanner } from 'src/components/header/PlaylistBanner';
import isEqual from 'react-fast-compare';

type Props = {};

const PlayListComponent = (props: Props) => {
    const { dispatch, navigation, route } = useScreenController()
    const playlistData = useAppSelector(state => state.playlist?.playlistData)
    const featurePlaylist = useAppSelector(state => state.home.playlist) as any

    const [isLoading, setLoading] = useState(true)
    const [blurHashColor, setBlurHashColor] = useState('')
    const [bgColor, setBgColor] = useState('')

    const playlistParams = route?.params?.item as any

    const translationY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y
    })

    useLayoutEffect(() => {
        if (!isIOS) {
            StatusBar.setTranslucent(true)
            StatusBar.setBackgroundColor('transparent')
        }
        return () => {}
    }, [])

    useEffect(() => {
        Promise.all([getData()]).then(() => {
        setLoading(false)
        })
    }, [])

    const getData = async () => {
        const response = await dispatch(getPlaylistData({ id: playlistParams.id }))
        await getContainerColor(response?.payload?.images[0]?.url)
    }

    const getContainerColor = useCallback(
        async (imgUrl: string) => {
        const bgColor = await getBackGroundPlayer(imgUrl)
        const blurHashColor =
            bgColor !== Colors.grey.player ? await getBlurhashColor(imgUrl) : false
        setBgColor(bgColor ?? '')
        setBlurHashColor(blurHashColor !== false ? blurHashColor : '')
        },
        [playlistParams, playlistData],
    )

    const openBottomModal = (item: any, position = 1) => {
        dispatch(
            searchActions.onSelectTrack({
                ...item,
                position,
                from: 'playlist',
            }),
        )
    }

    const onPlayQeue = () => {
        startPlaylist(playlistData.tracks.items.map(t => t.track) ?? [])
    }

    const onPlayTrack = async (item: any) => {
        await startAudio({
            info: item,
            from: 'playlist',
            })
        await TrackPlayer.setPlayWhenReady(true)
    }

    const onGoPlaylist = (item: any) => {
        navigation.push({
            name: 'PlaylistScreen',
            params: {
                item,
            },
        })
    }

    const renderSwitchedItem = useCallback(
        (index: number, item: any) => {
        switch (index) {
            case 0:
                return (
                    <TrackItem
                        onPlayTrack={onPlayTrack}
                        item={item}
                        tracks={playlistData?.tracks?.items.map(t => t.track) ?? []}
                        openBottomModal={openBottomModal}
                    />
                )
            case 1:
                return (
                    <FeatureListItem
                        item={item}
                        data={featurePlaylist?.items ?? []}
                        onGoPlaylist={onGoPlaylist}
                    />
                )
            default:
                return null
        }
        },
        [playlistData],
    )

    if (isLoading) return <ScreenLoader style={styles.loading} />

    return (
        <View style={[Layout.fill]}>
            <PlaylistBanner
                name={playlistParams?.name ?? ''}
                img={playlistData?.images[0]?.url ?? ''}
                bgColor={bgColor}
                blurHashColor={blurHashColor}
                translationY={translationY}
            />

            <FloatingButton translationY={translationY} onPress={onPlayQeue} />

            <AnimatedList
                bounces={false}
                overScrollMode="never"
                keyExtractor={item => item.id}
                data={PlayListData}
                onScroll={scrollHandler}
                contentContainerStyle={styles.wrapContent}
                scrollEventThrottle={16}
                renderFooter={() => <View style={styles.footer} />}
                ListHeaderComponent={() => (
                    <HeaderList info={playlistData} bgColor={bgColor} />
                )}
                style={styles.item}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({ item, index }: any) => {
                return (
                    <View style={styles.renderItem}>
                        {renderSwitchedItem(index, item)}
                    </View>
                )
                }}
            />
        </View>
    )
}

export const PlaylistScreen = memo(PlayListComponent, isEqual)

const styles = StyleSheet.create({
    wrapContent: {
        backgroundColor: Colors.black.default,
        marginTop: Header_Distance,
        paddingBottom: scale(360),
    },
    renderItem: { paddingHorizontal: scale(10) },
    divider: {
        height: scale(30),
    },
    loading: {
        flex: 1,
    },
    item: {},
    footer: {
        height: scale(80),
    },
})
