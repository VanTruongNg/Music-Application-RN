import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HomeTab } from '../tab';
import { PlaylistScreen, ArtistScreen, AlbumScreen, AlbumListScreen } from 'src/Screens';

export type HomeStackParamList = {
    HomeTab: undefined,
    PlaylistScreen: undefined,
    PlayerStack: undefined,
    ArtistScreen: undefined,
    AlbumScreen: undefined
    AlbumListScreen: undefined
}
export type HomeStackNavigationProp = 
NativeStackNavigationProp<HomeStackParamList>

export type HomeStackRouteProps<RouteName extends keyof HomeStackParamList> = 
RouteProp<HomeStackParamList, RouteName>

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions = {{
                headerShown:false,
                animation: 'fade'
            }}>
                <Stack.Screen name='HomeTab' component={HomeTab} />
                <Stack.Screen name="ArtistScreen" component={ArtistScreen}/>
                <Stack.Screen name='AlbumScreen' component={AlbumScreen}/>
                <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
                <Stack.Screen name='AlbumListScreen' component={AlbumListScreen}/>
        </Stack.Navigator>
    )
}

export default HomeStack