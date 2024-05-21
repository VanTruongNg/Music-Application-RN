import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import Layout from 'src/themes/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigation } from 'src/common/navigation';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import { BoldText } from '../text';
import isEqual from 'react-fast-compare';

type Props = {
  title: string
}

const HeaderListComponent = ({ title }: Props) => {
    return (
        <View style={[Layout.rowBetween, styles.container, styles.marginTop]}>
            <TouchableOpacity onPress={navigation.goBack}>
                <Ionicons
                name="arrow-back"
                size={scale(24)}
                color={Colors.white.default}
                />
            </TouchableOpacity>

            <BoldText textStyle={styles.title}>{title}</BoldText>

            <View />
        </View>
    )
}

export const BackHeader = memo(HeaderListComponent, isEqual);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(10),
        paddingVertical:scale(10),
        backgroundColor: Colors.grey.default,
    },
    title: {
        fontSize: fontScale(16),
    },
    marginTop: {
        marginTop: 45
    }
})
