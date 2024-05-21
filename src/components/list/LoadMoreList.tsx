import React, { useCallback, useState } from "react";
import { FlatList, Keyboard } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { LoadMoreFooter } from "../loader";
import { ToTopButton } from "../button";
import { LoadMoreListProps } from "./type";

const AnimatedList = Animated.createAnimatedComponent(FlatList)

const LoadMoreList = React.forwardRef((props: LoadMoreListProps<any>, ref)=> {
    const {
        data,
        renderItem,
        renderFooter = null,
        renderHeader,
        flatListRef,
        totalPages,
        noMomentum = false,
        onGetData,
    } = props

    const canMomentum = React.useRef(false)

    const [page, setPage] = useState<number>(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const translationY = useSharedValue(0)

    React.useImperativeHandle(ref, () => ({
        isLoadMore,
        refresh,
        page
    }))

    const onBackOnTop = useCallback (()=> {
        flatListRef?.current?.scrollToOffset({offset: 0, animated: true})
    },[])

    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y;
    });

    const handleLoadMore = () => {
        const currentPage = page + 10
        if (currentPage > totalPages) {
            return
        }

        handleGetData(currentPage)
        setPage(prev => prev + 10)
    }

    const handleRefresh = useCallback(async(): Promise<void> => {
        try {
            setRefresh(true)
            await handleGetData()
            setPage(0)
        } finally {
            setRefresh(false)
        }
    }, [onGetData])

    const handleGetData = useCallback(async(pageNumber = 0): Promise<void> => {
        try {
            setIsLoadMore(false)
            onGetData(pageNumber)
        } finally {
            setIsLoadMore(true)
        }
    }, [onGetData])

    return (
        <>
            <AnimatedList 
                {...props}
                onScroll={scrollHandler}
                onScrollBeginDrag={Keyboard.dismiss}
                keyExtractor={(item, index) => index.toString()}
                ref = {flatListRef}
                data={data}
                renderItem={renderItem}
                removeClippedSubviews
                scrollEventThrottle={16}
                ListFooterComponent={
                    renderFooter ?? <LoadMoreFooter totalPages={totalPages} page={page}  />
                }
                {...(renderHeader && {ListHeaderComponent: renderHeader})}
                onRefresh={handleRefresh}
                refreshing={refresh}
                initialNumToRender={10}
                onMomentumScrollBegin={() => {
                    canMomentum.current = false
                }}
                onEndReached={() => {
                    if (!canMomentum.current || noMomentum){
                        handleLoadMore()
                        canMomentum.current = true
                    }
                }}
                onEndReachedThreshold={0.01}
                />
                <ToTopButton onPress={onBackOnTop} translationY={translationY} />
        </>
    )
})

export default LoadMoreList