import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { PlayerScreen } from "src/Screens"

interface Props {}

export type PlayerStackParamList = {
    PlayerScreen: {
        trackURL: string
    }
}

const Stack = createNativeStackNavigator<PlayerStackParamList>()

const PlayerStack = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}>
            <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
        </Stack.Navigator>
    )
}

export default PlayerStack
