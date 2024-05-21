import React, { memo } from 'react';
import { View, ViewStyle } from 'react-native';
import { scale } from 'src/common/scale';

const DEFAULT_SPACE = scale(15);

export type SpacerMode = 'horizontal' | 'vertical' | 'expand';

const SPACER_STYLES = {
  horizontal: (size: number): ViewStyle => ({ width: size }),
  vertical: (size: number): ViewStyle => ({ height: size }),
  expand: (): ViewStyle => ({ flex: 1 }),
};

export const Spacer = React.memo(
  ({
    mode = 'vertical',
    size = DEFAULT_SPACE,
    style = {},
  }: {
    mode?: SpacerMode;
    size?: number;
    style?: ViewStyle;
  }) => {
    const styles = SPACER_STYLES[mode](size);
    return <View style={[styles, style]} />;
  },
);
