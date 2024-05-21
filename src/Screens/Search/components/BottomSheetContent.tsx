import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Layout from 'src/themes/Layout';
import { BoldText, RegularText } from 'src/components/text';
import { fontScale, scale } from 'src/common/scale';
import { Spacer } from 'src/components/spacer';
import Colors from 'src/themes/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { optionList } from 'src/common/service';
import {
  AddToPlaylistIcon,
  AddToQueueIcon,
  ViewAlbumIcon,
  ViewArtistIcon,
} from 'src/components/svg';
import {
  addTrackToPlaylist,
  checkLoveTrack,
  removeTrackFromPlaylist,
} from 'src/common/firebase';
import Toast from 'react-native-toast-message';
import { AnimatedImage } from 'src/components/image';
import { navigation } from 'src/common/navigation';
import { SelectTrackFields } from 'src/store/action-slices';
import { Album } from 'src/models/Album';

type Props = {
    info: SelectTrackFields
    onCloseModal: () => void
    selectArtist?: (item: any) => void
};

const BottomSheetContent = ({ info, onCloseModal, selectArtist }: Props) => {
    const [isLiked, setLiked] = useState(false)

    const handleLikePress = useCallback(() => {
        if (isLiked) {
            removeTrackFromPlaylist({ data: info, callback: () => {} })
            Toast.show({
                text1: 'Đã xóa khỏi danh sách',
                type: 'toastMessage',
        })
        } else {
            addTrackToPlaylist({ data: info, callback: () => {} })
            Toast.show({
                text1: 'Đã thêm vào danh sách yêu thích',
                type: 'toastMessage',
        })
        }
    }, [isLiked])

    useEffect(() => {
        if (info?.id) {
            checkLoveTrack(info.id).then(bool => {
                setLiked(bool)
            })
        }
    }, [])

    const onShowArtist = () => {
        if (info.artists.length > 1) {
        selectArtist?.(info.artists)
        } else {
        onCloseModal()
        navigation.push({
            name: 'ArtistScreen',
            params: {
            item: { id: info.artists[0].id, name: info.artists[0].name },
            },
        })
        }
    }

    const onShowAlbum = () => {
        onCloseModal();
        navigation.push({
            name: 'AlbumScreen',
            params: {
                item: {
                id: info.album?.id,
                name: info.album?.name,
                album: info?.album,
                },
            },
        })
    }

    const OptionCard = ({ item }: any) => {
        const renderIcon = () => {
        const iconSize = scale(24);
        const color = Colors.unActive;

        const IconComponent = () => {
            switch (item.id) {
            case 0:
                return (
                <>
                    {isLiked ? (
                    <Ionicons
                        name="heart-sharp"
                        size={iconSize}
                        color={Colors.green.default}
                    />
                    ) : (
                    <Ionicons
                        name="heart-outline"
                        size={iconSize}
                        color={color}
                    />
                    )}
                </>
                );
            case 1:
                return (
                <AddToPlaylistIcon
                    width={iconSize}
                    height={iconSize}
                    color={color}
                    viewBox={`-5 0 ${68} ${60}`}
                />
                );
            case 2:
                return (
                <AddToQueueIcon
                    width={iconSize}
                    height={iconSize}
                    color={color}
                    viewBox={`-5 0 ${68} ${60}`}
                />
                );
            case 3:
                return (
                <ViewAlbumIcon
                    width={iconSize}
                    height={iconSize}
                    color={color}
                    viewBox={`-5 0 ${68} ${60}`}
                />
                );
            case 4:
                return (
                <ViewArtistIcon
                    width={iconSize}
                    height={iconSize}
                    color={color}
                    viewBox={`-5 0 ${68} ${60}`}
                />
                );
            case 5:
                return (
                <Ionicons
                    name={item.inactiveIcon}
                    size={iconSize}
                    color={color}
                />
                );
            default:
                return null;
            }
        };

        const iconHandlers = [
            {
                id: 0,
                onPress: () => {
                    handleLikePress();
                    onCloseModal();
                },
            },
            {
                id: 1,
                onPress: () => {
                },
            },
            {
                id: 2,
                onPress: () => {
                },
            },
            {
                id: 3,
                onPress: () => {
                    onShowAlbum()
                },
            },
            {
                id: 4,
                onPress: () => {
                    onShowArtist()
                },
            },
        ]

        return (
            <TouchableOpacity
            style={[Layout.rowVCenter, styles.option]}
            onPress={() =>
                iconHandlers[item.id] && iconHandlers[item.id].onPress()
            }>
            <IconComponent />
            <View style={{ paddingLeft: scale(10) }}>
                <BoldText textStyle={{ fontSize: fontScale(15) }}>
                {item.id === 0 && isLiked ? item.liked : item.name}
                </BoldText>
            </View>
            </TouchableOpacity>
        )
        }
        return <View>{renderIcon()}</View>
    }

    const RenderOptionList = () => {
        let list = optionList.SelectTrackOption;
        if (info.from === 'album') {
            list = list.filter((_, index) => index !== 3)
        } else if (info.from === 'artist') {
            list = list.filter((_, index) => index !== 4)
        }

        return list.map((i: any, index) => {
            return (
                <View key={index} style={{ paddingHorizontal: scale(15) }}>
                    <Spacer size={scale(20)} />
                    <OptionCard item={i} />
                </View>
            )
        })
    }

    const selectImageSource = useCallback((album: Album) => {
        if (album?.images?.length > 1) {
        return { uri: album?.images[2].url }
        } else if (album?.images?.length === 1) {
        return { uri: album?.images[0].url }
        }
        return ''
    }, [])

    if (!info) return null;

    return (
        <View style={styles.container}>
        <View style={[Layout.rowVCenter, styles.header]}>
            {selectImageSource(info.album) ? (
            <AnimatedImage
                containerStyle={styles.img}
                resizeMode="cover"
                source={selectImageSource(info.album)}
            />
            ) : null}

            <View style={[Layout.colVCenter, styles.cardInfo]}>
            <BoldText textStyle={styles.trackName} numberOfLines={1}>
                {info.name}
            </BoldText>
            <Spacer size={scale(5)} />
            <RegularText textStyle={styles.artistName}>
                {info.artists[0].name}
            </RegularText>
            </View>
        </View>
        <Spacer size={scale(15)} style={styles.divider} />
        {RenderOptionList()}
        </View>
    )
    }

export default BottomSheetContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scale(5),
    },
    img: {
        width: scale(40),
        height: scale(40),
    },
    cardInfo: {
        marginLeft: scale(10),
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingRight: scale(50),
    },
    option: {
        // borderWidth:2, borderColor:'red'
    },
    header: { paddingHorizontal: scale(15) },
    artistName: { fontSize: fontScale(12), color: Colors.unActive },
    trackName: { fontSize: fontScale(16) },
    divider: { borderBottomColor: Colors.grey.placeHolder, borderWidth: 0.2 },
})
