import { memo } from "react";
import { View, StyleSheet } from "react-native"
import { WaveIndicator } from "react-native-indicators";
import { scale } from "src/common/scale";
import Colors from "src/themes/Colors";
import layout from 'src/themes/Layout'

const AppLoaderComponent = () => {
    return (
        <View 
            style={[
                layout.fillAbsolute,
                layout.fullSize,
                layout.center,
                styles.container
            ]}>
                <WaveIndicator size={scale(60)} color={Colors.white.default} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
});

export const AppLoader = memo (AppLoaderComponent)