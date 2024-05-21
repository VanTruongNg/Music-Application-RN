import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./stacks/HomeStack";
import { LoadingScreen } from "src/Screens/Loading/loadingScreen";
import { dispatch, useAppSelector } from "src/common/redux";
import { useEffect, useState } from "react";
import { authRequestToken } from "src/store/action-thunk";

const RootStack = createNativeStackNavigator();

const RootNavigator = () =>{
    const {isLogin, access_token, tokenExpiration} = useAppSelector (state => state.auth)
    const {env} = useAppSelector(state => state.app)
    const [tokenReady, setTokenReady] = useState (
        !!access_token && !(tokenExpiration <= Date.now())
    )

    const requestToken = async () => {
        await dispatch (
            authRequestToken({
                client_id: env?.CLIENT_ID ?? '',
                client_secret: env?.CLIENT_SECRET ?? '',
                baseUrl: env?.AUTH_URL ?? '',
            })
        )
    }

    useEffect(()=>{
        setTokenReady (!!access_token && !(tokenExpiration <= Date.now()))
    }, [tokenExpiration])

    useEffect(()=>{
        if (isLogin) {
            if (!access_token || !tokenReady) {
                setTimeout(()=>{
                    requestToken()
                },1000)
            }else {}
        }
    }, [isLogin, tokenReady])

    return (
        <RootStack.Navigator
            screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
            {isLogin ? (
                tokenReady ? (
                    <RootStack.Screen name="HomeStack" component={HomeStack} />
                ) : (
                    <RootStack.Screen name="LoadingScreen" component={LoadingScreen} />
                )
            ): (
                <RootStack.Screen name="AuthStack" component={AuthStack} />
            )}
        </RootStack.Navigator>
    )
}

const AuthStack = () => {
    return (
        <RootStack.Navigator
            screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                <RootStack.Screen name="AuthScreen" component={HomeStack} />
        </RootStack.Navigator>
    )
}

export default RootNavigator