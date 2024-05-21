export interface AlertProps {
    isShowAlert: boolean;
    error?: any;
    msg?: string;
    text1?: string;
    text2?: string;
    onPress1?: () => void | Promise<void>;
    onPress2?: () => void | Promise<void>;
  }