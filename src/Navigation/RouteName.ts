import { LibraryStackParamList } from "./stacks/LibraryStack";

export type NavigationStackNames = {
    AuthStack: undefined;
    MainStack: undefined;
    HomeStack: undefined;
    HomeTab: undefined;
    PlayerStack: undefined;
    LibraryStack: LibraryStackParamList;
    SearchStack: undefined;
}

export type ScreenNames = {
    PlayerScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    PlaylistScreen: undefined;
    LoveListScreen: undefined;
    AlbumListScreen: undefined;
    Home: undefined;
    SearchScreen: undefined;
    ArtistScreen: undefined;
    AlbumScreen: undefined;
}

export type RouteName = ScreenNames & NavigationStackNames

export type RouteParams = {
    screen?: keyof ScreenNames
    params?: any
}

export type NavigationType = {
    name: keyof RouteName
    params?: RouteParams | object
}