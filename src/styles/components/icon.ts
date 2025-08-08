import { palette } from '@/styles/colors';

export type IconColor = {
  dark: string;
  light: string;
  gray: string;
  primary: string;
  success: string;
  error: string;
  warning: string;
  black: string;
  white: string;
};

export const iconColors: IconColor = {
  dark: palette.black,
  light: palette.white,
  primary: palette.primary,
  success: palette.success,
  error: palette.error,
  warning: palette.warning,
  black: palette.black,
  gray: palette.gray400,
  white: palette.white,
};
