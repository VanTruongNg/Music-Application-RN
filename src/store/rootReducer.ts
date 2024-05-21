
import { persistCombineReducers } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage'
import persistReducer from "redux-persist/es/persistReducer";
import { playlistReducer, appReducer, authReducer, homeReducer, searchReducer, playerReducer, artistReducer, albumReducer, } from "./action-slices";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
}

const appPersistConfig = {
    key:'app',
    storage: AsyncStorage,
    blacklist: ['loadingApp']
}

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist: []
}

const playerPersistConfig = {
    key: 'player',
    storage: AsyncStorage,
    whitelist: ['currentTrack'],
};

const searchPersistConfig = {
    key: 'search',
    storage: AsyncStorage,
    whitelist: ['searchRecentData'],
};

const rootReducer = persistCombineReducers(rootPersistConfig,{
    app: persistReducer (appPersistConfig, appReducer),
    auth: persistReducer (authPersistConfig, authReducer),
    home: homeReducer,
    player: persistReducer (playerPersistConfig, playerReducer),
    search: persistReducer(searchPersistConfig, searchReducer),
    artist: artistReducer,
    playlist: playlistReducer,
    album: albumReducer
})

export default rootReducer