import { memo, useCallback, useEffect, useRef, useState } from "react"
import { BottomSheetRef } from "./type"
import { dispatch, useAppSelector } from "src/common/redux"
import { searchActions } from "src/store/action-slices"
import { navigation } from "src/common/navigation"
import BottomModal from "./BottomModal"
import { Portal } from "react-native-portalize"
import { SelectArtist } from "src/Screens/Search/components"
import BottomSheetContent from "src/Screens/Search/components/BottomSheetContent"
import isEqual from "react-fast-compare"

type Props = {}

const SelectTrackModalComponent = (props: Props) => {
    const {selectedTrack} = useAppSelector(state => state.search)

    const [visible, setVisible] = useState(false)
    const [selectedArtist, setSelectedArtist] = useState([])

    const trackModalRef = useRef<BottomSheetRef>(null)

    const onCloseModal = useCallback(() => {
        dispatch(searchActions.onDeleteSelectTrack())
        setVisible(false)
        setSelectedArtist([])
        trackModalRef?.current?.onClose()
    }, [])

    const openBottomModal = useCallback((position = 1) => {
        trackModalRef.current?.onOpen(position)
        setVisible(true)
    }, [])

    const onNavigate = useCallback(async (item: any, type: string) => {
        navigation.push({
            name: 'ArtistScreen',
            params: {
                item: item
            }
        })
    }, [])

    const selectArtist = useCallback((item: any) => {
        setSelectedArtist(item)
        trackModalRef.current?.onClose()
        setTimeout(() => {
            trackModalRef.current?.onOpen(0)
        }, 200)
    },[])

    useEffect(() => {
        if (!selectedTrack?.id) return 
        openBottomModal(selectedTrack.position)
    }, [selectedTrack?.id])

    return (
        <Portal>
            <BottomModal onCloseModal={onCloseModal} ref={trackModalRef}>
                {visible ? (
                    selectedArtist.length > 0 ? (
                        <SelectArtist
                            data={selectedArtist}
                            onPressItem={(item: any) => {
                                onCloseModal();
                                onNavigate(item, 'artist');
                            }}
                        />
                    ): (
                        <BottomSheetContent
                            info={selectedTrack as any}
                            onCloseModal={onCloseModal}
                            selectArtist={(item: any) => selectArtist(item)}
                        />
                    )
                ): null}
            </BottomModal>
        </Portal>
    )
}

export const SelectedTrackModal = memo(SelectTrackModalComponent, isEqual)