import { useFocusEffect } from "@react-navigation/native"
import { useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { getPlaylist } from "src/common/firebase"
import { useScreenController } from "src/common/hooks"
import { fontScale, scale } from "src/common/scale"
import { Container } from "src/components/container"
import { Header } from "src/components/header"
import { Spacer } from "src/components/spacer"
import { RegularText } from "src/components/text"
import Colors from "src/themes/Colors"
import { PlaylistCard } from "./components"

type Props = {}

const LibraryScreen = (props: Props) => {
    const {translate, navigation} = useScreenController()
    const [list, setList] = useState<any>([])

    useFocusEffect(() => {
        getPlaylist().then(res => {
            setList(res)
        })
    })

    const onNavigate = (data: any) => {
        navigation.navigate({
            name:'LibraryStack',
            params: {
                screen: 'LoveListScreen',
                params: {data}
            }
        })
    }

    return (
        <Container style={styles.container}>
            <Header title={translate('home:library')}/>
            <View style={styles.body}>
                <View style={[styles.tag]}>
                    <RegularText textStyle={{fontSize: fontScale(12)}}>
                        {translate('library:playlist')}
                    </RegularText>
                </View>
                <Spacer size={scale(20)}/>
                <FlatList
                    data={list}
                    renderItem={({item}: any) => (
                        <PlaylistCard onNavigate={data => onNavigate(data)} item={item}/>
                    )}
                />
            </View>
        </Container>
    )
}

export default LibraryScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(10),
        flex: 1,
    },
    body: {
        paddingTop: scale(15)
    },
    tag: {
        backgroundColor: Colors.grey.body,
        paddingHorizontal: scale(12),
        paddingVertical: scale(7),
        borderRadius: 15,
        alignSelf: 'flex-start',
    }
})