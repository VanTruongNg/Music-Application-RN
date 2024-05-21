import { ActivityIndicator, View } from "react-native"
import { isIOS } from "src/common/devices"
import { scale } from "src/common/scale"
import { StyleSheet } from "react-native"
import Colors from "src/themes/Colors"

interface Props{
    page: number
    totalPages: number
}

const LoadMoreFooterComponent = ({page, totalPages}: Props) => {
    if (
        page < totalPages &&
        page !== 0 &&
        totalPages > 10 &&
        totalPages - page >= 10
    ){
        return (
            <ActivityIndicator 
                style = {styles.indicator}
                size= 'large'
                color = {Colors.green.default}
            />
        )
    }
    return <View style={styles.divider} />
}

const styles = StyleSheet.create({
    indicator: {
      marginVertical: scale(20),
      alignSelf: 'center',
      marginBottom: isIOS ? scale(40) : 55,
    },
    divider: {
      height: scale(120),
    },
});


export const LoadMoreFooter = LoadMoreFooterComponent