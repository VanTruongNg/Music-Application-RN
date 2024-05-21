import { TouchableOpacity, View, StyleSheet, Image, FlatList } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { fontScale, scale } from "src/common/scale"
import { TrackDataItemFields } from "src/models/Track"
import Layout from "src/themes/Layout"
import Colors from "src/themes/Colors"
import { BoldText, MediumText } from "src/components/text"
import { formatNumber } from "src/common/helper"
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useAppSelector } from "src/common/redux"

type Props = {
    item: any,
    data: TrackDataItemFields[]
    openBottomModal: (item: TrackDataItemFields) => void
    onPlayTrack: (item: TrackDataItemFields) => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const RenderItem = ({
    item,
    index,
    openBottomModal,
    onPlayTrack,
    currentTrack
}: {
    item: TrackDataItemFields
    index: number
    openBottomModal: (item:  TrackDataItemFields) => void
    onPlayTrack: (item: TrackDataItemFields) => void
    currentTrack: TrackDataItemFields
}) => {
    const scaleAble = useSharedValue<number> (1)

    const onPressIN = () => {
        scaleAble.value = withSpring(0.95)
    }

    const onPressOUT = () => {
        scaleAble.value = withSpring(1)
    }

    const stylez = useAnimatedStyle(() => {
        const scale = interpolate(
            scaleAble.value,
            [0.8, 1],
            [1.1, 1]
        )

        return {
            transform: [{scale}]
        }
    }, [scaleAble.value])

    return (
        <AnimatedTouchableOpacity
            onPressIn={onPressIN}
            onPressOut={onPressOUT}
            onLongPress={() => openBottomModal(item)}
            onPress={() => onPlayTrack(item)}
            activeOpacity={1}
            style={[Layout.rowBetween, stylez]}
        >
            <View style ={[Layout.rowCenter, styles.container]}>
                <MediumText>{index+1}</MediumText>

                <View style={[Layout.rowVCenter, styles.wrapInfo]}>
                    <Image 
                        source={{uri: item?.album?.images[0]?.url}}
                        style= {styles.image}
                    />

                    <View style={styles.name}>
                        <BoldText
                            numberOfLines={1}
                            textStyle={[
                                styles.title,
                                {
                                    color: currentTrack.id === item.id ? Colors.green.default : Colors.white.default
                                }
                            ]}>
                                {item?.name}
                        </BoldText>
                        <MediumText textStyle={styles.follower}>
                            {formatNumber(
                                Math.floor(Math.random() *1000) * ((item?.popularity ?? 24) + 550)
                            )}
                        </MediumText>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={[Layout.center, styles.rightIcon]}
                onPress={() => openBottomModal(item)}
            >
                <SimpleLineIcons
                    name= 'options-vertical'
                    size={scale(18)}
                    color={Colors.unActive}/>
            </TouchableOpacity>
        </AnimatedTouchableOpacity>
    )
}

const TopTrackComponent = ({
    data,
    item,
    openBottomModal,
    onPlayTrack
}:Props) => {

    const currentTrack = useAppSelector(state => state.player.currentTrack)
    const HeaderList = (name: string) => {
        return <BoldText textStyle={styles.header}>{name}</BoldText>
    }

    return (
        <FlatList 
            renderItem={({item, index}) => (
                <RenderItem 
                    currentTrack={currentTrack}
                    openBottomModal={openBottomModal}
                    onPlayTrack={onPlayTrack}
                    item={item}
                    index={index}
                />
            )}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider}/>}
            ListHeaderComponent={() => HeaderList(item.name)}
        />
    )
}

export const TopTrackItem = TopTrackComponent

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
    }
})