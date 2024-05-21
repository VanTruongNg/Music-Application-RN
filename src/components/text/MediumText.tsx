import { Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { CustomTextProps } from "./type";
import { fontScale } from "src/common/scale";
import { FONT_FAMILY } from "src/common/constants";
import { memo } from "react";
import isEqual from "react-fast-compare";

const MediumTextComponents = (props: CustomTextProps) => {
    const theme = useTheme();
    return (
      <Text
        allowFontScaling={false}
        {...props}
        style={[{ color: theme.colors.text }, styles.text, props.textStyle]}>
        {props.children}
      </Text>
    );
};

export const MediumText = memo (MediumTextComponents, isEqual)

const styles = StyleSheet.create({
    text: {
      fontSize: fontScale(14),
      fontWeight: '500',
      fontFamily: FONT_FAMILY.MEDIUM,
    },
});

