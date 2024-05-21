import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState, store } from "src/store/store"
import { select } from 'redux-saga/effects'
import { createRef, forwardRef, useImperativeHandle } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch | any>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const selector: TypedUseSelectorHook<RootState> = select

type ActionBase<T = any> = {
    type:string
    payload? : T
}

type RXStoreType = {
    dispatch: (action: any) => any
    getState: <K extends keyof RootState>(selector: K) => RootState[K] | any
}

const storeRef = createRef<RXStoreType>()

export const RXStore = forwardRef((_, ref) => {
    const dispatchRX = useAppDispatch();
    useImperativeHandle(
        storeRef,
        () => ({
            dispatch: (action: ActionBase) => {
                dispatchRX(action)
            },
            getState: (state: keyof RootState) => {
                const store = useAppSelector(x=> x)
                return store[state]
            } 
        }),[dispatchRX, store]
    )
    return null
})

export const dispatch = (action: any): any => {
    if (storeRef.current){
        storeRef.current.dispatch(action)
    }
}

export function getState<K extends keyof RootState>(selector: K): RootState[K] {
    return store.getState()[selector];
  }