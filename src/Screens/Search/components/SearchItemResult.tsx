import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import { MediumText } from 'src/components/text';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TrackDataFields, TrackDataItemFields } from 'src/models/Track';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { kWidth } from 'src/common/constants';
import { dispatch } from 'src/common/redux';
import { FilterParams, searchActions } from 'src/store/action-slices';
import { ArtistDataItemFields } from 'src/models/Artist';
import { translate } from 'src/common/language/translate';
import { formatNumber } from '../../../common/helper/math/index';
import { AnimatedImage } from 'src/components/image';

interface Props {
    onNavigate: (item: any, type: FilterParams) => void
    item: any
    isRecentList: boolean
    selectedFilter: FilterParams
    openBottomModal: (item: TrackDataItemFields) => void
    currentTrack: TrackDataFields
}

const SearchItemComponent = ({
    onNavigate,
    item,
    isRecentList,
    openBottomModal,
    selectedFilter,
    currentTrack,
}: Props) => {
    const TrackItem = (props: {
        item: TrackDataItemFields
        onNavigate: (item: any, type: FilterParams) => void
        type: FilterParams
  }) => {
    return (
        <TouchableOpacity
            style={[
            Layout.row,
            {
                flex: 1,
            },
            ]}
            onPress={() => props.onNavigate(props.item, props.type)}>
            <AnimatedImage
            key={props.item.id}
            source={{
                uri: props.item?.album?.images[2]?.url,
            }}
            containerStyle={styles.trackImage}
            resizeMode="cover"
            />
            <View style={styles.info}>
            <MediumText
                numberOfLines={1}
                textStyle={[
                styles.songname,
                {
                    color:
                    currentTrack?.id === props.item.id
                        ? Colors.green.default
                        : 'white',
                },
                ]}>
                {props.item.name}
            </MediumText>
            <MediumText numberOfLines={1} textStyle={styles.artists}>
                {props.item.artists[0].name}
            </MediumText>
            </View>
        </TouchableOpacity>
        );
    };

    const ArtistItem = (props: {
        item: ArtistDataItemFields;
        onNavigate: (item: any, type: FilterParams) => void;
        type: FilterParams;
    }) => {
        return (
            <TouchableOpacity
                style={[
                Layout.row,
                {
                    flex: 1,
                },
                ]}
                onPress={() => props.onNavigate(props.item, props.type)}>
                <AnimatedImage
                key={props.item.id}
                source={{
                    uri: props.item?.images?.[2]?.url,
                }}
                containerStyle={styles.artistImage}
                resizeMode="cover"
                />
                <View style={styles.info}>
                <MediumText numberOfLines={1} textStyle={[styles.songname]}>
                    {props.item.name}
                </MediumText>
                <MediumText numberOfLines={1} textStyle={styles.artists}>
                    {formatNumber(props.item.followers.total)} -{' '}
                    {translate('search:folower')}
                </MediumText>
                </View>
            </TouchableOpacity>
        )
    }

    const RecentList = () => {
        return (
            <>
                {item.type === 'artists' ? (
                <ArtistItem onNavigate={onNavigate} item={item} type={'artist'} />
                ) : (
                <TrackItem onNavigate={onNavigate} item={item} type="track" />
                )}

                <TouchableOpacity
                style={styles.rightIcon}
                onPress={() => {
                    dispatch(
                    searchActions.removeSearchRecentList(isRecentList ? item.id : ''),
                    );
                }}>
                <MaterialIcons
                    size={scale(24)}
                    color={Colors.unActive}
                    name="close"
                />
                </TouchableOpacity>
            </>
        )
    }

    return (
        <>
            <View style={[Layout.rowBetween, styles.container]}>
                {isRecentList ? (
                <RecentList />
                ) : (
                <>
                    {selectedFilter === 'track' ? (
                    <TrackItem onNavigate={onNavigate} item={item} type="track" />
                    ) : (
                    <ArtistItem onNavigate={onNavigate} item={item} type="artist" />
                    )}

                    {selectedFilter === 'track' ? (
                    <TouchableOpacity
                        style={styles.rightIcon}
                        onPress={() => openBottomModal(item)}>
                        <SimpleLineIcons
                        name="options-vertical"
                        size={scale(16)}
                        color={Colors.unActive}
                        />
                    </TouchableOpacity>
                    ) : null}
                </>
                )}
            </View>
        </>
    )
}

export const SearchItemResult = memo(
  SearchItemComponent,
  (prevProps, nextProps) => {
        const prevId = prevProps.item.id;
        const currentId = nextProps.item.id;
        const prevCurrentTrackId = prevProps.currentTrack.id;
        const nextCurrentTrackId = nextProps.currentTrack.id;

        return (
        //bằng nhau không render
        prevId === currentId &&
        //nếu item hiện tại bằng với current track thì render đổi màu
        currentId !== nextCurrentTrackId &&
        //nếu current trước đó bằng item hiện tại thì render đổi màu
        prevCurrentTrackId !== currentId
        );
    },
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  artistImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(50) / 2,
    overflow: 'hidden',
  },
  trackImage: {
    width: scale(55),
    height: scale(55),
  },
  item: {
    marginTop: scale(20),
  },
  artists: {
    color: Colors.unActive,
    fontSize: fontScale(14),
    maxWidth: kWidth - scale(100),
  },
  songname: {
    fontSize: fontScale(16),
    maxWidth: kWidth - scale(100),
  },
  info: {
    marginLeft: scale(10),
    justifyContent: 'center',
    flex: 1,
    gap: scale(5),
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(30),
  },
});
