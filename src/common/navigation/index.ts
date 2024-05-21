import { StackActions, createNavigationContainerRef } from "@react-navigation/native";
import { NavigationType } from "src/Navigation/RouteName";

export const navigationRef = createNavigationContainerRef<any>()

function navigate ({name,params}: NavigationType){
    navigationRef?.navigate(name, params)
}

function push({ name, params }: NavigationType) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params));
    }
}

function replace(name: string, params?: any) {
    navigationRef?.dispatch(StackActions.replace(name, params));
}

function reset(params?: any) {
    navigationRef?.reset(params);
}

function goBack() {
    if (navigationRef.current?.canGoBack?.()) {
      navigationRef?.goBack();
    }
}

export const navigation = {
    navigate,
    replace,
    reset,
    goBack,
    push,
};