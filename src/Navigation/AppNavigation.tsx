import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { MyAppTheme } from "src/themes"
import RootNavigator from './RootNavigator'
import { RXStore, useAppDispatch, useAppSelector } from "src/common/redux"
import { appInit } from "src/store/action-thunk/AppThunk"
import RNBootSplash from 'react-native-bootsplash'
import { navigationRef } from "src/common/navigation"
import { Host } from "react-native-portalize"
import { SnackBar } from "src/components/snack-bar"
import TrackPlayer from "react-native-track-player"

export const AppNavigation = () => {
    const {theme, env} = useAppSelector(state => state.app)
    const [init, setInit] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        const init = async () => {
            await dispatch(appInit())
            await TrackPlayer.setupPlayer()
        }
        init().finally(()=>{
            setInit(true)
            RNBootSplash.hide({fade: true})
        })
    },[])
    
    return (
        <NavigationContainer theme={MyAppTheme[theme]} ref={navigationRef} >
            {init && env && (
                <Host>
                    <RootNavigator />
                </Host>
            )}
            <SnackBar/>
            <RXStore/>
        </NavigationContainer>
    )
} 