import { memo } from "react"
import isEqual from "react-fast-compare"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { usePaginateData } from "src/common/hooks"
import { useAppSelector } from "src/common/redux"
import { fontScale, scale } from "src/common/scale"
import { LoadMoreList } from "src/components/list"
import { BoldText } from "src/components/text"
import { TrackDataItemFields } from "src/models/Track"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"
import { MediumText } from "src/components/text"
import { AnimatedImage } from "src/components/image"
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

type Props = {
    item: any;
    tracks: TrackDataItemFields[];
    openBottomModal: (item: TrackDataItemFields) => void;
    onPlayTrack: (item: TrackDataItemFields) => void;
  }

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const TrackItemComponent = ({
    tracks, 
    item,
    openBottomModal,
    onPlayTrack
}: Props) => {
    const currentTrack = useAppSelector (state => state.player.currentTrack)
    const {data, handleLoadMore, totalPages} = usePaginateData({orgData: tracks, limit: 10})
    const HeaderList = (name: string) => {
        return <BoldText textStyle={styles.header}>{name}</BoldText>
    }

    return (
        <LoadMoreList
            renderFooter={() =>{}}
            noMomentum={true}
            onGetData={handleLoadMore}
            onEndReachedThreshold={0.5}
            totalPages={totalPages}
            renderItem={({ item, index }: any) => (
                <RenderItem
                    openBottomModal={openBottomModal}
                    onPlayTrack={onPlayTrack}
                    item={item}
                    index={index}
                    currentTrack={currentTrack}
                />
            )}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            ListHeaderComponent={() => HeaderList(item.name)}
        />
    )
}

export const TrackItem = memo (TrackItemComponent, isEqual)

const RenderItem = memo (
    ({
        item,
        index,
        openBottomModal,
        onPlayTrack,
        currentTrack
    }: {
        item: TrackDataItemFields
        index: number
        openBottomModal: (item: TrackDataItemFields) => void
        onPlayTrack: (item: TrackDataItemFields) => void
        currentTrack: TrackDataItemFields
    }) => {
        const scaleAble = useSharedValue<number>(1)

        const onPressIn = () => {
            scaleAble.value = withSpring(0.95)
        }

        const onPressOut = () => {
            scaleAble.value = withSpring(1);
        };

        const stylez = useAnimatedStyle(() => {
            const scale = interpolate(scaleAble.value, [0.8, 1], [1.1, 1])

            return {
                transform: [{scale}]
            }
        }, [scaleAble.value])

        return (
            <AnimatedTouchableOpacity
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onLongPress={() => openBottomModal(item)}
                onPress={()=> onPlayTrack(item)}
                activeOpacity={1}
                style = {[Layout.rowBetween, stylez]}>
                <View style={[Layout.rowVCenter, styles.container]}>
                    <MediumText>{index + 1}</MediumText>

                    <View style={[Layout.rowVCenter, styles.wrapInfo]}>
                        <AnimatedImage
                        source={{ uri: item?.album?.images[0]?.url }}
                        containerStyle={styles.image}
                        />
                        <View style={styles.name}>
                        <BoldText
                            numberOfLines={1}
                            textStyle={[
                            styles.title,
                            {
                                color:
                                currentTrack.id === item.id
                                    ? Colors.green.default
                                    : Colors.white.default,
                            },
                            ]}>
                            {item?.name}
                        </BoldText>
                        <MediumText textStyle={styles.follower}>
                            {item?.artists?.[0]?.name}
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
      fontSize: fontScale(20),
      marginBottom: scale(15),
    },
    container: {
      flex: 1,
    },
    rightIcon: {
      width: scale(24),
      height: scale(24),
      marginLeft: scale(25),
    },
  });