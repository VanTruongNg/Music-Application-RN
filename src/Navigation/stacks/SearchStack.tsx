import React from "react";
import {  createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from 'src/Screens';

interface Props{}

export type SearchStackParamList = {
    SearchScreen: undefined
}


const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchStack = (props: Props) => {
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false,
            animation: 'fade',
        }}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default SearchStack