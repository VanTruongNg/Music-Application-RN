import { useScreenController } from "src/common/hooks/useScreenController"
import { debounce } from "lodash"
import { searchActions } from "src/store/action-slices"
import { View, StyleSheet } from "react-native"
import Colors from "src/themes/Colors"
import { scale } from "src/common/scale"
import { Input } from "src/components/input"
import Octicons from 'react-native-vector-icons/Octicons';
import { memo } from "react"
import isEqual from "react-fast-compare"

interface Props{
    onGetData: (query: string) => void
}

const SearchBoxComponent = ({onGetData}: Props) => {
    const {translate, dispatch} = useScreenController()

    const debouncedSearch = debounce(query => {
        dispatch(searchActions.setKeyword(query))
        onGetData(query)
    }, 300)

    const onChangeTextValue = (value: any) => {
        debouncedSearch(value)
    }

    return (
        <View style={styles.container}>
            <Input 
                style={styles.inputStyle}
                onChangeTextValue={onChangeTextValue}
                placeholder={translate('search:placeholder')}
                placeholderTextColor={'black'}
                contentLeft={() => (
                    <Octicons name="search" color={'black'} size={scale(18)} />
                )}
                defaultValue=""
            />
        </View>
    )
}

export const SearchBox = memo (SearchBoxComponent, isEqual)

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.white.default,
      borderRadius: scale(5),
      paddingHorizontal: scale(10),
    },
    inputStyle: {
      paddingVertical: scale(4),
    },
  });