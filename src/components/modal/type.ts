import { ReactNode } from "react";
import { SharedValue } from "react-native-reanimated";

export interface BottomSheetProps {
    snapPoints?:
      | (string | number)[]
      | SharedValue<(string | number)[]>
      | Readonly<(string | number)[] | SharedValue<(string | number)[]>>;
    children: ReactNode;
    onCloseModal: () => void;
  }
  
  export type BottomSheetRef = {
    onOpen: (index: number) => {};
    onClose: () => {};
}