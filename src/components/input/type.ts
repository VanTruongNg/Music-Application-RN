import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  validate?: boolean;
  onChangeTextValue?: (input: string) => void;
  contentRight?: () => React.ReactNode;
  contentLeft?: () => React.ReactNode;
  defaultValue: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface InputRef {
  value: string;
  setValue: (valueInput: string) => void;
  setError: (textError: string) => void;
  clearError: () => void;
  clear: () => void;
}
