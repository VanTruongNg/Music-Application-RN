import { useTheme } from "@react-navigation/native";
import { CustomTextProps } from "./type";
import React, {memo} from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { fontScale } from "src/common/scale";
import  isEqual from 'react-fast-compare'
import { FONT_FAMILY } from "src/common/constants";

const BoldTextComponent = (props: CustomTextProps) => {
    const theme = useTheme();
    const AnimatedText = Animated.Text;

    return (
        <AnimatedText
            allowFontScaling={false}
            {...props}
            style = {[{color: theme.colors.text}, styles.text, props.textStyle ]} >
                {props.children}
        </AnimatedText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: fontScale (14),
        fontWeight: 'bold',
        fontFamily: FONT_FAMILY.BOLD
    }
})

export const BoldText = memo (BoldTextComponent, isEqual);