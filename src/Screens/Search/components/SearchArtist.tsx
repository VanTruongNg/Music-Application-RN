import { TouchableOpacity, StyleSheet } from "react-native"
import FastImage from "react-native-fast-image"
import { FlatList } from "react-native-gesture-handler"
import { translate } from "src/common/language/translate"
import { fontScale, scale } from "src/common/scale"
import { Spacer } from "src/components/spacer"
import { BoldText, MediumText } from "src/components/text"
import Colors from "src/themes/Colors"
import Layout from "src/themes/Layout"

type Props = {
    data: {
        id: string,
        name: string
    }[]
    onPressItem: (item: {id: string, name: string}) => void
}

const SelectArtist = ({data, onPressItem}: Props) => {
    const RenderItem = ({id, name}: any) => {
        return (
            <TouchableOpacity
            onPress={() => onPressItem({id, name})}
            style={[Layout.rowCenter, Layout.fill, styles.item]}
            activeOpacity={0.7}>
                <FastImage 
                    style={styles.img}
                    source={require('src/assests/images/artistDefault.png')}
                />
                <MediumText numberOfLines={1} textStyle={styles.name}>
                    {name}
                </MediumText>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={data}
            ItemSeparatorComponent={() => (
                <Spacer size={scale(15)} style={styles.divider}/>
            )}
            ListHeaderComponent={() => (
                <BoldText textStyle={styles.header}>
                    {translate('search:artist')}
                </BoldText>
            )}
            renderItem={({item}) => RenderItem(item)}
        />
    )
}

export default SelectArtist

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scale(5),
    },
    item: {
        marginTop: scale(5),
        gap: scale(8),
        marginHorizontal: scale(15),
        overflow: 'hidden',
    },
    divider: { borderBottomColor: Colors.grey.placeHolder, borderWidth: 0.2 },
    name: {
        fontSize: fontScale(16),
    },
    header: {
        fontSize: fontScale(20),
        textAlign: 'center',
        marginBottom: scale(20),
    },
    img: {
        width: scale(35),
        height: scale(35),
        borderRadius: scale(35 / 2),
    },
  })