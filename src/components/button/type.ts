import { TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";

interface IconProps {
    name?: string;
    size?: number;
    color?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
    onPress?: any;
    title?: string;
    outline?: boolean;
    fullSize?: boolean;
    radius?: number;
    disable?: boolean;
    customStyle?: StyleProp<ViewStyle>;
    iconLeft?: IconProps;
    iconRight?: IconProps;
    icon?: IconProps;
    size?: string;
    arrowImage?: string;
    textStyle?: StyleProp<TextStyle>;
    shadow?: boolean;
    containerStyle?: StyleProp<TextStyle>;
    translationY?: SharedValue<number>;
  }