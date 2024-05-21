import { FlatList } from "react-native";
import Animated from "react-native-reanimated";
import { AnimatedListProps } from "./type";

const List = Animated.createAnimatedComponent(FlatList)

const AnimatedList = (props: AnimatedListProps<any>) => {
    const {
        data,
        renderItem,
        renderFooter = null,
        renderHeader,
        flatListRef = null,
    } = props;
    
    return (
        <List
            {...props}
            ref={flatListRef}
            data={data}
            renderItem={renderItem}
            removeClippedSubviews
            scrollEventThrottle={16}
            ListFooterComponent={renderFooter}
            {...(renderHeader && { ListHeaderComponent: renderHeader })}
            initialNumToRender={5}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default AnimatedList