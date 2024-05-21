import React, { memo } from "react"
import { Container } from "src/components/container"
import Layout from "src/themes/Layout"
import {MaterialIndicator} from 'react-native-indicators'
import { scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import isEqual from "react-fast-compare"

interface Props{}

const LoadingScreenComponent = (props: Props) => {
    return (
        <Container style= { Layout.center }>
            <MaterialIndicator size={scale(40)} color={Colors.green.default} />
        </Container>
    )
}

export const LoadingScreen = memo (LoadingScreenComponent, isEqual)
