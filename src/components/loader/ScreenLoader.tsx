import { ViewStyle, View } from "react-native"
import { MaterialIndicator } from "react-native-indicators"
import { scale } from "src/common/scale"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"

type Props = {
    style?: ViewStyle
}

const ScreenLoader = ({ style = {} }: Props) => {
    return (
        <View style={[Layout.center, style]}>
            <MaterialIndicator size={scale(50)} color={Colors.green.default} />
        </View>
    )
}

export default ScreenLoader