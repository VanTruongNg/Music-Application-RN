import React from 'react';
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export interface ContainerProps {
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
    safeAreaBackground?: string
    safeAreaProps?: SafeAreaViewProps
    imageType?: string
}

export interface ScrollContainerProps extends ContainerProps{
    contentContainerStyle?: StyleProp<ViewStyle>
}