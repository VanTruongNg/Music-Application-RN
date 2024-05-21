import { StatusBar, StyleSheet, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Layout from 'src/themes/Layout';
import { AnimatedList } from 'src/components/list';
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useScreenController } from 'src/common/hooks';
import { ArtistDataItemFields } from 'src/models/Artist';
import { scale } from 'src/common/scale';
import { isIOS } from 'src/common/devices';
import Colors from 'src/themes/Colors';
import {
  AlbumRelateItem,
  ArtistAlbumList,
  ArtistRelateItem,
  CategoryList,
  FloatingButton,
  HeaderList,
  TopTrackItem,
} from './components';
import { getArtistData, getArtistInfo } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { ScreenLoader } from 'src/components/loader';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import { startAudio, startPlaylist } from 'src/common/player';
import { searchActions } from 'src/store/action-slices';
import TrackPlayer from 'react-native-track-player';
import { AlbumParams } from 'src/models/Album';
import { ArtistBanner } from 'src/components/header';

type Props = {};

const ArtistScreen = (props: Props) => {
    const { route, dispatch, navigation } = useScreenController()
    const { artistData } = useAppSelector(state => state.artist)
    const [isLoading, setLoading] = useState(true)
    const [blurHashColor, setBlurHashColor] = useState('')
    const [bgColor, setBgColor] = useState('')

    const artistParams = route?.params?.item as ArtistDataItemFields

    const [artistInfo, setArtistInfo] = useState(artistParams)

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
        Promise.all([getData(), getContainerColor()]).finally(() => {
            setLoading(false)
        })
    }, [])

    const getData = () => {
        dispatch(getArtistData({ id: artistParams.id, limit: 4 }));
    };

    const getContainerColor = useCallback(async () => {
        let imgUrl = ''

        if (artistParams && artistParams.images && artistParams.images.length > 0) {
            imgUrl = artistParams.images[0].url
        } else {
            const response = await dispatch(getArtistInfo({ id: artistParams.id }))
            imgUrl = await response?.payload?.images[0]?.url
            setArtistInfo(response?.payload)
        }

    const bgColor = await getBackGroundPlayer(imgUrl);
        const blurHashColor =
            bgColor !== Colors.grey.player ? await getBlurhashColor(imgUrl) : false
            setBgColor(bgColor ?? '')
            setBlurHashColor(blurHashColor !== false ? blurHashColor : '')
    }, [artistParams])

    const onPlayQeue = () => {
        startPlaylist(artistData?.topTracks ?? []);
    }

    const openBottomModal = (item: any, position = 1) => {
        dispatch(
            searchActions.onSelectTrack({
                ...item,
                position,
                from: 'artist',
            }),
        )
    }

    const onGoArtistRelate = (artist: ArtistDataItemFields) => {
        navigation.push({
            name: 'ArtistScreen',
            params: {
                item: { id: artist.id, name: artist.name },
            },
        })
    }

    const onPlayTrack = async (item: any) => {
        await startAudio({
            info: item,
            from: 'album',
        })
        await TrackPlayer.setPlayWhenReady(true);
    }

    const onGoAlbumScreen = (item: AlbumParams) => {
        navigation.push({
            name: 'AlbumScreen',
            params: {
                item,
            },
        })
    }

    const onGoAlbumListScreen = () => {
        navigation.push({
            name: 'AlbumListScreen',
            params: {
                item: artistParams,
            },
        })
    }

    const renderSwitchedItem = useCallback(
        (index: number, item: any) => {
        switch (index) {
            case 0:
                return (
                    <TopTrackItem
                        item={item}
                        data={artistData?.topTracks?.slice(0, 5) ?? []}
                        openBottomModal={openBottomModal}
                        onPlayTrack={onPlayTrack}
                    />
                )
            case 1:
                return (
                    <ArtistAlbumList
                        onGoAlbumListScreen={onGoAlbumListScreen}
                        onGoAlbumScreen={onGoAlbumScreen}
                        item={item}
                        data={artistData?.artistAlbum?.items ?? []}
                    />
                )
            case 2:
                return (
                    <AlbumRelateItem
                        onGoAlbumScreen={onGoAlbumScreen}
                        item={item}
                        name={artistParams?.name}
                        data={artistData?.relatedAlbum?.items ?? []}
                    />
                )
            case 3:
                return (
                    <ArtistRelateItem
                        onGoArtistRelate={onGoArtistRelate}
                        item={item}
                        data={artistData?.relatedArtist ?? []}
                    />
                )
            default:
                
        }
        },
        [artistData],
    )

    if (isLoading) return <ScreenLoader style={styles.loading} />;

    return (
        <View style={[Layout.fill]}>
        <ArtistBanner
            blurHashColor={blurHashColor}
            bgColor={bgColor}
            img={artistInfo?.images[0]?.url}
            name={artistInfo.name}
            translationY={translationY}
        />

        <FloatingButton translationY={translationY} onPress={onPlayQeue} />

        <AnimatedList
            bounces={false}
            overScrollMode="never"
            keyExtractor={item => item.id}
            data={CategoryList}
            onScroll={scrollHandler}
            contentContainerStyle={styles.wrapContent}
            scrollEventThrottle={16}
            ListHeaderComponent={() => (
            <HeaderList
                follower={artistInfo?.followers?.total}
                bgColor={bgColor}
            />
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
};

export default ArtistScreen

const styles = StyleSheet.create({
    wrapContent: {
        backgroundColor: Colors.black.default,
        marginTop: scale(260),
        paddingBottom: scale(360),
    },
    renderItem: { paddingHorizontal: scale(10) },
    divider: {
        height: scale(30),
    },
    loading: {
        flex: 1,
    },
    item: {
        marginBottom: scale(30),
    },
})
