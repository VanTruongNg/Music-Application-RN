import { FlatListProps, FlatList } from "react-native";
import { RefObject } from "react";

export interface LoadMoreListProps<T> extends AnimatedListProps<T> {
    totalPages: number
    noMomentum?: boolean
    onGetData: (pageNumber: number) => void
}

export interface AnimatedListProps<T> extends FlatListProps<any> {
    data: T[];
    renderHeader?: any;
    renderFooter?: any;
    renderItem: any;
    flatListRef?: RefObject<FlatList<T>>;
  }