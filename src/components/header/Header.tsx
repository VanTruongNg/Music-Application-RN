import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import Layout from 'src/themes/Layout';
import { BoldText } from '../text';
import { fontScale, scale } from 'src/common/scale';
import FastImage from 'react-native-fast-image';

interface Props {
  RightContent?: () => React.ReactNode;
  title: string;
  RightContentStyle?: StyleProp<ViewStyle>;
}

const HeaderComponent = (props: Props) => {
  const { RightContent, title, RightContentStyle } = props;

  return (
    <View style={[Layout.rowBetween, styles.container]}>
      <View style={[Layout.rowBetween, styles.leftContent]}>
      <FastImage
          source={require('src/assests/images/Spotify_Logo.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <BoldText textStyle={styles.title}>{title}</BoldText>
      </View>
      {RightContent && (
        <View style={[Layout.rowBetween, RightContentStyle]}>
          {RightContent()}
        </View>
      )}
    </View>
  );
};

export const Header = memo(HeaderComponent, isEqual);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(20),
    marginTop: 25
  },
  leftContent: {},
  image: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(10),
  },
  title: {
    fontSize: fontScale(22),
    textAlignVertical: 'center',
    marginBottom: scale(2),
  },
});
