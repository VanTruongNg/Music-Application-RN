import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {persistStore} from 'redux-persist'
import rootReducer from "./rootReducer";
import { createLogger } from 'redux-logger';
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }).concat (sagaMiddleware, createLogger()),
    devTools: __DEV__
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore (store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export {store, persistor}