import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import equals from 'react-fast-compare';
import { fontScale } from 'src/common/scale';
import { FONT_FAMILY } from 'src/common/constants';
import { CustomTextProps } from './type';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

const RegularTextComponents = (props: CustomTextProps) => {
  const theme = useTheme();
  const AnimatedText = Animated.Text

  return (
    <AnimatedText
      allowFontScaling={false}
      {...props}
      style={[{ color: theme.colors.text }, styles.text, props.textStyle]}>
      {props.children}
    </AnimatedText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontScale(12),
    fontFamily: FONT_FAMILY.REGULAR,
  },
});

export const RegularText = memo(RegularTextComponents, equals);
