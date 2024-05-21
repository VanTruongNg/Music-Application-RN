import { View, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { BoldText } from '../text';
import { fontScale, scale } from 'src/common/scale';
import Colors from 'src/themes/Colors';
import Layout from 'src/themes/Layout';
import Toast from 'react-native-toast-message';
import { TAB_HEIGHT } from 'src/common/constants';
import { memo } from 'react';
import isEqual from 'react-fast-compare';

const toastConfig = {
    toastMessage: ({ text1, props }: any) => (
      <View style={[Layout.rowCenter, styles.toast]}>
        <SimpleLineIcons
          name={'check'}
          size={scale(16)}
          style={styles.icon}
          color={Colors.white.default}
        />
        <BoldText textStyle={styles.text}>{text1}</BoldText>
      </View>
    ),
};

const SnackBarComponent = () => {
    return (
      <Toast
        config={toastConfig}
        bottomOffset={TAB_HEIGHT}
        position="bottom"
        visibilityTime={1500}
      />
    );
};

export const SnackBar = memo(SnackBarComponent, isEqual)

const styles = StyleSheet.create({
    toast: {
      marginHorizontal: scale(10),
      height: scale(37),
      backgroundColor: '#317e23',
      borderRadius: 50,
      paddingHorizontal: 20,
      gap: scale(5),
    },
    text: {
      color: Colors.white.default,
      fontSize: fontScale(14),
    },
    icon: {
    },
});