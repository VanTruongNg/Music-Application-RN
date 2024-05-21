import { TouchableOpacity, View, StyleSheet, FlatList } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useAppSelector } from "src/common/redux"
import { fontScale, scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import { Artist, TrackDataFields, TrackDataItemFields } from "src/models/Track"
import { memo, useCallback } from "react"
import Layout from "src/themes/Layout"
import { BoldText, MediumText } from "src/components/text"
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import isEqual from "react-fast-compare"

type Props = {
    item: any
    tracks: TrackDataFields[]
    openBottomModal: (item: TrackDataItemFields) => void
    onPlayTrack: (item: TrackDataFields) => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const TopTrackComponent = ({
    item, 
    tracks, 
    openBottomModal, 
    onPlayTrack
}:Props) => {
    const currentTrack = useAppSelector(state => state.player.currentTrack)

    const HeaderList = (name: string) => {
        return <View style={styles.header}/>
    }

    return (
        <FlatList
            renderItem={({item, index}) => (
                <RenderItem 
                    openBottomModal={openBottomModal}
                    onPlayTrack={onPlayTrack}
                    item={item}
                    index={index}
                    currentTrack={currentTrack}
                />
            )}
            data={tracks}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider}/>}
            ListHeaderComponent={() => HeaderList(item.name)}
        />
    )
}

export const TrackItem = memo(TopTrackComponent, isEqual)

const RenderItem = memo(
    ({
        item, index, openBottomModal, onPlayTrack, currentTrack
    } : {
        item: TrackDataItemFields 
        index: number,
        openBottomModal: (item: TrackDataItemFields) => void,
        onPlayTrack: (item: TrackDataFields) => void,
        currentTrack: TrackDataItemFields
    }) => {
        const scaleable = useSharedValue<number>(1)

        const onPressIN = () => {
            scaleable.value = withSpring(0.95)
        }

        const onPressOUT = () => {
            scaleable.value = withSpring(1)
        }

        const stylez = useAnimatedStyle(() => {
            const scale = interpolate(
                scaleable.value,
                [0.8, 1],
                [1.1, 1]
            )

            return {
                transform: [{scale}]
            }
        }, [scaleable.value])

        const artistSperator = useCallback((artists: Artist[]) => {
            return artists.map(artists => artists.name).join(', ')
        }, [])

        return (
            <AnimatedTouchableOpacity
                onPressIn={onPressIN}
                onPressOut={onPressOUT}
                onPress={() => onPlayTrack(item)}
                onLongPress={() => openBottomModal(item)}
                activeOpacity={1}
                style={[Layout.rowBetween, stylez]}>
                    <View style={[Layout.rowVCenter, styles.container]}>
                        <MediumText>{index + 1}</MediumText>

                        <View style={[Layout.rowVCenter, styles.wrapInfo]}>
                            <View style={styles.name}>
                                <BoldText 
                                    numberOfLines={1}
                                    textStyle={[
                                        styles.title,
                                        {
                                            color: 
                                                currentTrack.id === item.id
                                                ? Colors.green.default
                                                : Colors.white.default
                                        }
                                    ]}>
                                        {item?.name}
                                </BoldText>
                                <MediumText textStyle={styles.follower}>
                                    {artistSperator(item?.artists)}
                                </MediumText>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[Layout.center, styles.rightIcon]}
                        onPress={() => openBottomModal(item)}>
                            <SimpleLineIcons 
                                name="options-vertical"
                                size={scale(18)}
                                color={Colors.unActive}
                            />
                    </TouchableOpacity>
            </AnimatedTouchableOpacity>
        )
    },
    isEqual
)

const styles = StyleSheet.create({
    image: {
        width: scale(35),
        height: scale(35),
    },
    wrapInfo: {
        marginLeft: scale(15),
    },
    divider: {
        height: scale(15),
    },
    name: {
        marginLeft: scale(8),
        flex: 1,
    },
    follower: {
        color: Colors.unActive,
        fontSize: fontScale(14),
    },
    title: {
        fontSize: fontScale(16),
    },
    header: {
        marginBottom: scale(15),
        marginTop: scale(10),
    },
    container: {
        flex: 1,
    },
    rightIcon: {
        width: scale(24),
        height: scale(24),
        marginLeft: scale(25),
    },
})