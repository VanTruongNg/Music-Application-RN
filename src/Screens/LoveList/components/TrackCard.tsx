import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BoldText, RegularText } from 'src/components/text';
import { TrackDataItemFields } from 'src/models/Track';
import { formatSearchData } from 'src/store/action-slices';
import { useAppSelector } from 'src/common/redux';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';
import { fontScale, scale } from 'src/common/scale';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { startAudio } from 'src/common/player';
import TrackPlayer from 'react-native-track-player';

type Props = {
    item: TrackDataItemFields
    onOpenModal: (item: any) => void
}

const TrackCard = ({ item, onOpenModal }: Props) => {
    const { currentTrack } = useAppSelector(state => state.player)
    const { trackName, albumImage, artistName } = formatSearchData(item)

    const onOpenTrack = async () => {
        await startAudio({ info: item, from: 'playlist' })
        await TrackPlayer.setPlayWhenReady(true)
    }

    if (!item) return null
    return (
        <>
            <View style={[Layout.rowVCenter, styles.container]}>
                <TouchableOpacity
                style={[Layout.rowVCenter, { flex: 1 }]}
                onPress={onOpenTrack}>
                    <Image source={{ uri: albumImage }} style={styles.image} />
                    <View style={[Layout.colVCenter, styles.wrapInfo]}>
                        <BoldText
                            numberOfLines={1}
                            textStyle={[
                            {
                            color:
                                currentTrack.id === item.id
                                ? Colors.green.default
                                : Colors.white.default,
                            },
                            styles.track,
                        ]}>
                            {trackName}
                        </BoldText>

                        <RegularText numberOfLines={1} textStyle={[styles.artist]}>
                            {artistName}
                        </RegularText>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionIcon}
                    onPress={() => onOpenModal(item)}>
                    <SimpleLineIcons
                        name="options-vertical"
                        size={scale(16)}
                        color={Colors.unActive}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default TrackCard;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    image: {
        width: scale(50),
        height: scale(50),
    },
    track: {
        fontSize: fontScale(16),
    },
    artist: {
        fontSize: fontScale(12),
        color: Colors.white.darker,
    },
    wrapInfo: {
        marginLeft: scale(10),
        flex: 1,
    },
    optionIcon: {},
})
