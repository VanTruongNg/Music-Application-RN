import { SafeAreaView, View } from "react-native"
import { ContainerProps } from "./type"
import Layout from "src/themes/Layout"
import { memo } from "react"
import isEquals from "react-fast-compare"

const ContainerComponent = (props: ContainerProps) => {
    const {safeAreaProps} = props
    return (
        <SafeAreaView
            style={[Layout.fill]} edges={['top']} {...safeAreaProps}>
                <View style={[Layout.fill, props.style]}>
                    {props.children}
                </View>
        </SafeAreaView>
    )
}

export const Container = memo (ContainerComponent, isEquals)