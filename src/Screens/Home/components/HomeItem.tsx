import { useAppSelector } from "src/common/redux";
import { HomeFields } from "./HomeData";
import { View, StyleSheet } from "react-native";
import Layout from "src/themes/Layout";
import { fontScale, scale } from "src/common/scale";
import { BoldText } from "src/components/text";
import Colors from "src/themes/Colors";
import { TopList } from "./TopList";
import { memo } from "react";
import isEqual from "react-fast-compare";

interface Props {
    item: HomeFields
    onGoPlaylist: (item: {id: string}) => void
}

const HomeItemComponent = ({item, onGoPlaylist}: Props) => {
    const {homedata, playlist} = useAppSelector(state=> state.home)

    const toplist = homedata.items.slice(0, 10)
    const recommend = homedata.items.slice(10)
    const popular = playlist.items

    return (
        <View>
            <View style={[Layout.rowBetween,
                {
                    alignItems: 'flex-start',
                marginHorizontal: scale(16),
                marginTop: scale(10),
                }]}>
                    <BoldText textStyle={styles.title}>{item.title}</BoldText>
            </View>
            {
                item.type === 'toplist' && (
                    <TopList onGoPlaylist={onGoPlaylist} homedata={toplist} />
                )
            }
            {
                item.type === 'recommend' &&  (
                    <TopList onGoPlaylist = {onGoPlaylist} homedata={recommend} />
                )
            }
            {
                item.type === 'popular' && (
                    <TopList 
                        onGoPlaylist = {onGoPlaylist}
                        homedata = {popular.slice(0,Math.floor(popular.length/2))} 
                    />
                )
            }
            {
                item.type === 'popular' && (
                    <TopList
                        onGoPlaylist= {onGoPlaylist}
                        homedata={popular.slice(Math.floor(popular.length/2))}
                    />
                )
            }
        </View>
    )
}

export const HomeItem = memo(HomeItemComponent, isEqual)

const styles = StyleSheet.create({
    title: {
      fontSize: fontScale(22),
      marginRight: scale(10),
      color: Colors.white.default,
      marginBottom: scale(24),
      flex: 1,
    },
    viewText: {
      fontSize: fontScale(12),
      marginTop: scale(10),
      color: Colors.white.default,
    },
  });