import { TextProps, TextStyle, StyleProp } from "react-native";

export interface CustomTextProps extends TextProps {
    /**
     * @default undefined
     */ 
    textStyle?: StyleProp<TextStyle>;
}