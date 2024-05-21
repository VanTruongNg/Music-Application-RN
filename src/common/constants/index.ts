import { Dimensions } from "react-native";
import { scale } from "../scale";
import { hasNotch } from "../devices";

export const {width: kWidth, height: kHeight } = Dimensions.get('window')
export const FONT_FAMILY = {
    REGULAR: 'Inter-Regular',
    MEDIUM: 'Inter-Medium',
    MEDIUM_ITALIC: 'Inter-MediumItalic',
    SEMI_BOLD: 'Inter-SemiBold',
    BOLD: 'Inter-Bold',
    ITALIC: 'Inter-Italic',
    LIGHT: 'Inter-Light',
};

export const TAB_HEIGHT = hasNotch() ? scale(55) : scale(45);

export const ENV = {
    DEV: 'DEV',
    PRODUCTION: 'PRODUCTION',
}

export type EnvType = (typeof ENV)[keyof typeof ENV];