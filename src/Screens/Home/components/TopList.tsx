import { View, StyleSheet, TouchableOpacity } from "react-native"
import { scale } from "src/common/scale";
import Layout from "src/themes/Layout"
import Colors from "src/themes/Colors";
import { isIOS } from "src/common/devices";
import { AnimatedList } from "src/components/list";
import { HomeDataItemFields } from "src/models/API";
import Divider from "src/components/divider";
import { AnimatedImage } from "src/components/image";
import { memo } from "react";
import isEqual from "react-fast-compare";

const TopListComponent = ({homedata , onGoPlaylist}: any) => {
    return (
        <View style={[Layout.boxShadow, styles.listContainer]}>
            <AnimatedList 
                data={homedata}
                horizontal
                ItemSeparatorComponent={() => <Divider width={scale(8)} />}
                renderItem={({item}: HomeDataItemFields) => {
                    return (
                        <TouchableOpacity
                        style={styles.listWrapper}
                        activeOpacity={0.5}
                        onPress={() => onGoPlaylist(item)}>
                            <AnimatedImage 
                                source={item.images[0].url}    
                                resizeMode="contain"
                                containerStyle={Layout.fullSize}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export const TopList = memo (TopListComponent, isEqual)

const styles = StyleSheet.create({
    listContainer: {
      backgroundColor: Colors.black.default,
      paddingBottom: isIOS ? scale(16) : 0,
      marginHorizontal: scale(10),
      marginBottom: scale(20),
      overflow: 'hidden',
    },
    listWrapper: {
      overflow: 'hidden',
      width: scale(120),
      height: scale(120),
    },
  });