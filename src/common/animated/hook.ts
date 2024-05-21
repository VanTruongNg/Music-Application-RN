import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useInsets = () => {
    const { top, bottom, left, right } = useSafeAreaInsets();
    return {
      top,
      bottom,
      left,
      right
    }
}