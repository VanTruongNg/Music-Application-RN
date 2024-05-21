import { PixelRatio, Platform, Linking } from "react-native";
import { kWidth, kHeight } from "../constants";

const pixelDensity = PixelRatio.get();

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isTablet = () => {
    const adjustedWidth = kWidth * pixelDensity;
    const adjustedHeight = kHeight * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
      return true;
    } else {
      return (
        pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
      );
    }
  };

  const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_ZOOM_WIDTH = 320;
const IP12_ZOOM_HEIGHT = 693;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const IP14PRO_WIDTH = 393;
const IP14PRO_HEIGHT = 852;

const IP14MAX_WIDTH = 430;
const IP14MAX_HEIGHT = 932;

export const hasNotch = () => {
    if (Platform.OS !== 'ios' || Platform.isPad || Platform.isTV) {
      return false;
    }
    if (
      (kWidth === X_WIDTH && kHeight === X_HEIGHT) ||
      (kWidth === XSMAX_WIDTH && kHeight === XSMAX_HEIGHT) ||
      (kWidth === IP12_ZOOM_WIDTH && kHeight === IP12_ZOOM_HEIGHT) ||
      (kWidth === IP12_WIDTH && kHeight === IP12_HEIGHT) ||
      (kWidth === IP12MAX_WIDTH && kHeight === IP12MAX_HEIGHT) ||
      (kWidth === IP14PRO_WIDTH && kHeight === IP14PRO_HEIGHT) ||
      (kWidth === IP14MAX_WIDTH && kHeight === IP14MAX_HEIGHT)
    ) {
      return true;
    }
    return false;
  };

export const getBottomSpace = () => {
    return hasNotch() ? 34 : 0;
};

export const AppSetting = () => {
    Linking.openSettings();
  };

  