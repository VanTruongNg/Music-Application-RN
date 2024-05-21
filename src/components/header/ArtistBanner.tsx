import { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { Extrapolate, SharedValue, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { navigation } from "src/common/navigation";
import { fontScale, scale } from "src/common/scale";
import Colors from "src/themes/Colors";
import Constants from "src/themes/Constants";
import Layout from "src/themes/Layout";
import { BoldText, SemiBoldText } from "../text";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import isEqual from "react-fast-compare";

type Props ={
    blurHashColor: string
    bgColor: string
    img: string
    name: string
    translationY: SharedValue<number>
}

const Header_Max_Height = scale(380)
export const Header_Min_Height = scale(80)
const Header_Distance = scale(260)

const BannerComponent = ({
    bgColor,
    blurHashColor,
    img,
    name,
    translationY
}: Props) => {
    const headerStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [0, 140, 150],
            [0, 0, 1],
            Extrapolate.CLAMP
        )

        return {
            opacity
        }
    }, [translationY.value])

    const buttonStylez = useAnimatedStyle(() => {
        const left = interpolate(
            translationY.value,
            [0, Header_Distance],
            [Constants.scale15, Constants.scale10],
            Extrapolate.CLAMP
        )

        return {left}
    },[translationY.value])

    const headerNameStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [160, 200, 240],
            [0, 0.5, 1],
            Extrapolate.CLAMP
        )

        return {
            opacity,
            flex:1
        }
    },[translationY.value])

    const wrapButtonStylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            translationY.value,
            [0, Header_Distance],
            [0.6, 0],
            Extrapolate.CLAMP
        )

        return {
            opacity,
        }
    }, [translationY.value])

    const titleStylez = useAnimatedStyle(() => {
        const translateY = interpolate (
            translationY.value,
            [0, Header_Distance],
            [0, -Header_Distance],
            Extrapolate.CLAMP
        )

        const backgroundColor = interpolateColor(
            translationY.value,
            [0,300],
            ['transparent', bgColor]
        )

        return {
            transform: [{translateY}],
            backgroundColor,
        }
    }, [translationY.value, bgColor])

    const textStylez = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            translationY.value,
            [0, 220],
            ['transparent', bgColor]
        )

        return {
            backgroundColor
        }
    }, [translationY.value, bgColor])

    const FragmentView = blurHashColor === Colors.grey.player ? (
        <View style={[Layout.fill, {backgroundColor: bgColor}]}/>
    ) : (
        <Animated.View style={[Layout.fill, textStylez]}/>
    )

    const Header = useCallback(({name, headerStylez, FragmentView}: any) => {
        return (
            <Animated.View style={[Layout.absolute, styles.header]}>
                <Animated.View style={[Layout.fill]}>
                    <Animated.View style={[Layout.center, styles.backBtn, buttonStylez]}>
                        <Ionicons 
                            onPress={navigation.goBack}
                            name="arrow-back"
                            size={scale(24)}
                            color={'white'}
                            style={{marginLeft: scale(1)}}
                        />
                        <Animated.View style={[Layout.absolute, styles.wrapBtn, wrapButtonStylez]}/>
                    </Animated.View>

                    <Animated.View style={headerNameStylez}>
                        <SemiBoldText textStyle={styles.headerName}>{name}</SemiBoldText>
                    </Animated.View>
                </Animated.View>

                <Animated.View style={[Layout.absolute, headerStylez, {zIndex: -1}]}>
                    {FragmentView}
                </Animated.View>
            </Animated.View>
        )
    },[])

    return (
        <>
            <Header
                name={name}
                headerStylez={headerStylez}
                FragmentView={FragmentView}
            />

            <View style={[styles.container, Layout.absolute]}>
                <Animated.View style={[Layout.absolute, { zIndex: -10 }]}>
                    <FastImage 
                        source={{ uri: img }}
                        resizeMode="cover"
                        style={styles.background}
                    />
                </Animated.View>

                <Animated.View style={[styles.title, titleStylez]}>
                    <LinearGradient
                        style={styles.gradient}
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
                    >
                        <BoldText textStyle={styles.name}>{name}</BoldText>
                    </LinearGradient>
                </Animated.View>
            </View>
        </>
    )
}

export const ArtistBanner = memo(BannerComponent, isEqual)

const styles = StyleSheet.create({
    container: {
      height: Header_Max_Height,
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: -1,
    },
    background: {
      width: '100%',
      height: '100%',
      paddingTop: 30,
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
    },
    wrapBtn: {
      height: scale(42),
      width: scale(42),
      borderRadius: scale(42) / 2,
      zIndex: -2,
      backgroundColor: Colors.black.lighter1,
    },
    headerName: {
      position: 'absolute',
      bottom: scale(14),
      left: scale(62),
      fontSize: fontScale(16),
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
      fontSize: fontScale(42),
      paddingHorizontal: scale(10),
    },
})