import { RouteProp } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LibraryScreen, LoveListScreen } from "src/Screens"

interface Props {}

export type LibraryStackParamList = {
    LibraryScreen: undefined
    LoveListScreen: undefined
}

export type LibraryStackNavigationProp =
  NativeStackNavigationProp<LibraryStackParamList>

export type LibraryStackRouteProps<
  RouteName extends keyof LibraryStackParamList,
> = RouteProp<LibraryStackParamList, RouteName>

const Stack = createNativeStackNavigator<LibraryStackParamList>()

const LibraryStack = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            animation: 'fade',
        }}>
            <Stack.Screen name="LibraryScreen" component={LibraryScreen} />
            <Stack.Screen name="LoveListScreen" component={LoveListScreen}/>
        </Stack.Navigator>
    )
}

export default LibraryStack