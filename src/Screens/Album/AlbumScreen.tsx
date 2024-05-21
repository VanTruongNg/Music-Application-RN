import { StatusBar, StyleSheet, View } from 'react-native';
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { AnimatedList } from 'src/components/list';
import Layout from 'src/themes/Layout';
import {
    useAnimatedScrollHandler,
    useSharedValue,
} from 'react-native-reanimated';
import { useScreenController } from 'src/common/hooks';
import { getAlbumData, getSeveralArtists } from 'src/store/action-thunk';
import { useAppSelector } from 'src/common/redux';
import { AlbumBanner } from 'src/components/header';
import { isIOS } from 'src/common/devices';
import Colors from 'src/themes/Colors';
import { getBackGroundPlayer, getBlurhashColor } from 'src/common/helper';
import { ScreenLoader } from 'src/components/loader';
import { fontScale, scale } from 'src/common/scale';
import { Header_Distance } from 'src/components/header/AlbumBanner';
import {
    AlbumListData,
    FeatureListItem,
    FloatingButton,
    HeaderList,
    ListArtist,
    TrackItem,
} from './components';
import { searchActions } from 'src/store/action-slices';
import { ArtistDataItemFields } from 'src/models/Artist';
import { BoldText } from 'src/components/text';
import { startAudio, startPlaylist } from 'src/common/player';
import TrackPlayer from 'react-native-track-player';

type Props = {};

const AlbumScreen = (props: Props) => {
    const { dispatch, navigation, route } = useScreenController()
    const albumData = useAppSelector(state => state.album?.albumData)
    const featurePlaylist = useAppSelector(state => state.home.playlist) as any;

    const [isLoading, setLoading] = useState(true)
    const [bgColor, setBgColor] = useState('')
    const [artists, setArtists] = useState<ArtistDataItemFields[]>(
        albumData.artists as ArtistDataItemFields[],
    )

    const albumParams = route?.params?.item as any

    const translationY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y;
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
        setLoading(false);
        })
    }, [])

    const getData = async () => {
        const response = await dispatch(getAlbumData({ id: albumParams.id }))
        await getContainerColor(response?.payload?.images[1]?.url)
        const artists = await dispatch(
            getSeveralArtists({
                ids: response.payload.artists.map((i: any) => i.id),
            })
        )
        setArtists(artists?.payload?.artists)
    }

    const getContainerColor = useCallback(
        async (imgUrl: string) => {
        const bgColor = await getBackGroundPlayer(imgUrl)
        setBgColor(bgColor ?? '')
        },
        [albumParams, albumData],
    )

    const openBottomModal = (item: any, position = 1) => {
        dispatch(
            searchActions.onSelectTrack({
                ...item,
                position,
                from: 'album',
                album: albumParams?.album,
            }),
        )
    }

    const onGoArtistScreen = (artist: ArtistDataItemFields) => {
        navigation.push({
            name: 'ArtistScreen',
            params: {
                item: { id: artist.id, name: artist.name },
            },
        })
    }

    const onPlayQeue = () => {
        startPlaylist(albumData.tracks.items ?? [])
    }

    const onPlayTrack = async (item: any) => {
        await startAudio({
            info: { ...item, album: albumParams?.album },
            from: 'album',
        })
        await TrackPlayer.setPlayWhenReady(true)
    }

    const onGoPlaylist = (item: { id: string }) => {
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
                    tracks={albumData?.tracks?.items ?? []}
                    openBottomModal={openBottomModal}
                />
            )
            case 1:
            return (
                <ListArtist
                    release_Date={albumData?.release_date}
                    artists={artists ?? []}
                    onGoArtistScreen={onGoArtistScreen}
                />
            )
            case 2:
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
        [albumData, artists],
    )

    if (isLoading) return <ScreenLoader style={styles.loading} />;

    return (
        <View style={[Layout.fill]}>
        <AlbumBanner
            name={albumParams?.name ?? ''}
            img={albumData?.images[1]?.url ?? ''}
            bgColor={bgColor}
            translationY={translationY}
        />

        <FloatingButton translationY={translationY} onPress={onPlayQeue} />

        <AnimatedList
            bounces={false}
            overScrollMode="never"
            keyExtractor={item => item.id}
            data={AlbumListData}
            onScroll={scrollHandler}
            contentContainerStyle={styles.wrapContent}
            scrollEventThrottle={16}
            ListHeaderComponent={() => (
                <HeaderList info={albumData} bgColor={bgColor} />
            )}
            style={styles.item}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            renderFooter={() => (
                <BoldText textStyle={styles.footer}>
                    {albumData?.copyrights[0].text}
                </BoldText>
            )}
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

export default AlbumScreen;

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
        fontSize: fontScale(18),
        paddingLeft: scale(10),
        marginBottom: scale(80),
    },
})
