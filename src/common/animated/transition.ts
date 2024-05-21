import { useEffect } from "react";
import { SharedValue, WithTimingConfig, useDerivedValue, useSharedValue, withTiming, Easing } from "react-native-reanimated";
import { sharedBin } from "./math";

export const useSharedTransition = (
    state: boolean | number,
    config?: WithTimingConfig
): SharedValue<number> => {
    const value = useSharedValue(0);
    useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
    }, [state, value]);
    return useDerivedValue(() =>
        withTiming(
        value.value,
        Object.assign(
        { duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1) },
        config,
      ),
    ),
  );
}