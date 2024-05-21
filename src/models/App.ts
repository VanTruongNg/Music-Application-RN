import { ENVFields } from "src/common/config/env";
import { AlertProps } from "src/components/alert/type";
import { ThemeType } from "src/themes";

export interface AppState {
  loadingApp: boolean;
  handleAlert: AlertProps;
  showToastMessage: boolean;
  firstTimeLauch: boolean;
  theme: ThemeType;
  env: ENVFields | null;
  language: 'vi' | 'en';
}