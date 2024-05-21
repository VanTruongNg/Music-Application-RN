import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollContainerProps } from "./type";
import Layout from "src/themes/Layout";
import { View } from "react-native";
import { ScrollView } from "react-native";
import { memo } from "react";
import equals from 'react-fast-compare'

const ScrollableContainerComponent = (props: ScrollContainerProps) => {
    const {safeAreaBackground, safeAreaProps, style, contentContainerStyle} = props;
    return (
        <SafeAreaView style={[Layout.fill]} edges={['top']} {...safeAreaProps}>
            <View style={[Layout.fill, style]} >
                <ScrollView
                    contentContainerStyle={contentContainerStyle}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
                        {props.children}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export const ScrollContainer = memo (ScrollableContainerComponent, equals)