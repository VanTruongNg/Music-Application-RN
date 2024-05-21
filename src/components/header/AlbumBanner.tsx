import { StyleSheet, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { fontScale, scale } from 'src/common/scale';
import Layout from 'src/themes/Layout';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigation } from 'src/common/navigation';
import { BoldText, SemiBoldText } from '../text';
import LinearGradient from 'react-native-linear-gradient';
import Constants from 'src/themes/Constants';

type Props = {
  bgColor: string
  img: string
  name: string
  translationY: SharedValue<number>
};
const Header_Max_Height = scale(400)
const Header_Min_Height = scale(80)
export const Header_Distance = Header_Max_Height - Header_Min_Height

const scale45 = scale(45);
const BannerComponent = ({ bgColor, img, translationY, name }: Props) => {
    const headerStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
        translationY.value,
        [0, 230, 240],
        [0, 0, 1],
        Extrapolate.CLAMP,
        )

        return {
        opacity,
        }
    }, [translationY.value])

    const wrapButtonStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [0, Header_Distance],
            [0.6, 0],
            Extrapolate.CLAMP,
        )

        return {
            opacity,
        }
    }, [translationY.value])

    const headerNameStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [200, 240, 280],
            [0, 0.5, 1],
            Extrapolate.CLAMP,
        )

        return {
        opacity,
        flex: 1,
        }
    }, [translationY.value])

    const titleStylez = useAnimatedStyle(() => {
        const translateY = interpolate(
            translationY.value,
            [0, Header_Distance],
            [0, -Header_Distance],
            Extrapolate.CLAMP,
    )

    const backgroundColor = interpolateColor(
      translationY.value,
      [0, 240, 340],
      ['transparent', 'transparent', bgColor],
    )

    return {
        transform: [{ translateY }],
        backgroundColor,
    }
    }, [translationY.value, bgColor])

    const fragmentz = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            translationY.value,
            [0, 260],
            ['transparent', bgColor],
        )

        return {
            backgroundColor,
        }
    }, [translationY.value, bgColor])

    const imagez = useAnimatedStyle(() => {
        const scale = interpolate(
            translationY.value,
            [0, Header_Distance - 190],
            [1, 0.4],
            Extrapolate.CLAMP,
        )

        const opacity = interpolate(
            translationY.value,
            [0, Header_Distance - 190, Header_Distance - 140],
            [1, 1, 0],
            Extrapolate.CLAMP,
        )

        const translateY = interpolate(
            translationY.value,
            [0, Header_Distance - 190],
            [scale45, -Constants.scale100],
            Extrapolate.CLAMP,
        )

        return {
            transform: [{ scale }, { translateY }],
            opacity,
        }
    }, [translationY.value])


    const FragmentView = <Animated.View style={[Layout.fill, fragmentz]} />

    const Header = useCallback(({ name, headerStylez, FragmentView }: any) => {
        return (
        <Animated.View style={[Layout.absolute, styles.header]}>
            <Animated.View style={[Layout.fill]}>
            <View style={[Layout.center, styles.backBtn]}>
                <Icon
                    onPress={navigation.goBack}
                    name="arrow-back"
                    size={scale(24)}
                    color={'white'}
                    style={{ marginLeft: scale(1) }}
                />
                <Animated.View
                    style={[Layout.absolute, styles.wrapBtn, wrapButtonStylez]}
                />
            </View>

            <Animated.View style={headerNameStylez}>
                <SemiBoldText numberOfLines={1} textStyle={styles.headerName}>
                    {name}
                </SemiBoldText>
            </Animated.View>
            </Animated.View>

            <Animated.View style={[Layout.absolute, headerStylez, { zIndex: -1 }]}>
                {FragmentView}
            </Animated.View>
        </Animated.View>
        )
    }, [])

    return (
        <>
        <Header
            name={name}
            headerStylez={headerStylez}
            FragmentView={FragmentView}
        />
        <View style={[styles.container, Layout.absolute]}>
            <Animated.View style={[Layout.absolute, styles.wrapBackground]}>
            <Animated.View
                style={[Layout.absolute, Layout.fill, { backgroundColor: bgColor }]}
            />

            <Animated.View style={imagez}>
                <FastImage
                    source={{ uri: img }}
                    resizeMode="cover"
                    style={styles.background}
                />
            </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.title, titleStylez]}>
            <LinearGradient
                style={styles.gradient}
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}>
                <BoldText numberOfLines={1} textStyle={styles.name}>
                    {name}
                </BoldText>
            </LinearGradient>
            </Animated.View>
        </View>
        </>
    )
}

export const AlbumBanner = memo(BannerComponent, isEqual);

const styles = StyleSheet.create({
    container: {
        height: Header_Max_Height,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: -1,
    },
    background: {
        width: Header_Distance - scale(70),
        height: Header_Distance - scale(90),
    },
    header: {
        zIndex: 1,
        height: Header_Min_Height,
    },
    backBtn: {
        height: scale(42),
        width: scale(42),
        borderRadius: scale(42) / 2,
        position: 'absolute',
        bottom: scale(4),
        zIndex: 2,
        left: scale(10),
    },
    wrapBtn: {
        height: scale(42),
        width: scale(42),
        zIndex: -2,
    },
    headerName: {
        position: 'absolute',
        bottom: scale(14),
        left: scale(62),
        fontSize: fontScale(16),
        paddingRight: scale(100),
    },
    title: {
        height: Header_Distance,
        width: '100%',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: fontScale(26),
        paddingHorizontal: scale(10),
    },
    wrapBackground: {
        flex: 1,
        zIndex: -10,
        alignItems: 'center',
    },
})
