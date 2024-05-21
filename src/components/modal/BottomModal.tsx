import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { BottomSheetProps } from "./type";
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useTheme } from "src/themes";
import Colors from "src/themes/Colors";

const BottomModal = forwardRef((props: BottomSheetProps, ref)=>{
    const { colors } = useTheme()

    const {snapPoints = ['30%', '50%', '100%'], children, onCloseModal} = props
    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPointBottomSheet = useMemo(() => snapPoints, [])

    const handleSheetChanges = useCallback((index: number) => {}, [])

    useImperativeHandle(ref, () => ({
        onOpen: (index: number) => openBottmSheet(index),
        onClose: () => closeBottomSheet()
    }))

    const openBottmSheet = (index: number) => {
        bottomSheetRef.current?.snapToIndex(index)
    }

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close()
    }

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop 
            {...props}
            onPress = {() => {
                onCloseModal()
                closeBottomSheet()
            }}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
        />
    ), [])

    return (
        <BottomSheet
            backgroundStyle={{ backgroundColor: colors.info }}
            handleIndicatorStyle={{backgroundColor: Colors.unActive}}
            ref={bottomSheetRef}
            index={-1}
            backdropComponent={renderBackdrop}
            enablePanDownToClose={true}
            snapPoints={snapPointBottomSheet}
            onChange={handleSheetChanges}
        >
            {children}
        </BottomSheet>
    )
})

export default BottomModal