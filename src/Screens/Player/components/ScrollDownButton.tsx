import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'src/common/scale';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Constants, { FULLSCREEN_HEIGHT } from 'src/themes/Constants';
import { useInsets } from 'src/common/animated';

type Props = {
  translationY: SharedValue<number>;
  onPress: () => void;
};
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const ScrollDownButtonComponent = ({ translationY, onPress }: Props) => {
  const insets = useInsets();

  const animatedStyle = useAnimatedStyle(() => {
    const top = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, Constants.scale30 + insets.top - 3],
      'clamp',
    );

    return {
      top,
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [0, -FULLSCREEN_HEIGHT],
      [0, 1],
      'clamp',
    );

    return {
      opacity,
    };
  }, [translationY.value]);

  return (
    <AnimatedButton
      onPress={onPress}
      onLongPress={onPress}
      style={[animatedStyle, animatedOpacityStyle, styles.container]}>
      <Ionicons
        name="chevron-down-outline"
        color={'white'}
        size={scale(20)}
        style={{ marginLeft: -scale(5) }}
      />
    </AnimatedButton>
  );
};

export const ScrollDownButton = memo(
  ScrollDownButtonComponent,
  (prevProps, nextProps) => {
    return prevProps.translationY.value === nextProps.translationY.value;
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 3,
    left: scale(25),
  },
});
