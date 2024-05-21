import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;

export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

export const fontScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
