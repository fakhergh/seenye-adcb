import { hexToRgba } from '@/utils/color';

export const palette = {
  primary100: '#D7EBFF',
  primary200: '#A5C4FF',
  primary300: '#7CA8FF',
  primary400: '#2B7AFD',
  primary500: '#235CC1',
  primary600: '#1C3F85',

  dark1: '#18191a',
  dark2: '#242526',
  dark3: '#3a3b3c',

  gray900: '#212121',
  gray800: '#424242',
  gray700: '#616161',
  gray600: '#757575',
  gray500: '#9E9E9E',
  gray400: '#BDBDBD',
  gray300: '#E0E0E0',
  gray200: '#EEEEEE',
  gray100: '#F5F5F5',
  gray50: '#FAFAFA',

  black: '#000000',
  primary: '#2B7AFD',
  white: '#FFFFFF',
  success: '#4AAF57',
  info: '#246BFD',
  warning: '#FACC15',
  error: '#F75555',
  disabled: '#D8D8D8',
  transparent: '#00000000',
};

export const colors = {
  // background
  backgroundLight: palette.white,
  backgroundDark: palette.dark1,
  backgroundWhite: palette.white,
  backgroundBlack: palette.black,
  backgroundGray: palette.gray100,
  backgroundPrimary: palette.primary,
  backgroundSuccess: palette.success,
  backgroundDanger: palette.error,
  backgroundInfo: palette.info,
  backgroundWarning: palette.warning,
  backgroundPrimaryTransparent: hexToRgba(palette.primary, 0.1),
  //border
  borderLight: palette.white,
  borderDark: palette.dark1,
  borderWhite: palette.white,
  borderBlack: palette.black,
  borderGray: palette.gray600,
  borderGrayLight: palette.gray200,
  borderPrimary: palette.primary,
  borderSuccess: palette.success,
  borderDanger: palette.error,
  borderInfo: palette.info,
  borderWarning: palette.warning,
  // text
  textLight: palette.white,
  textDark: palette.dark1,
  textWhite: palette.white,
  textBlack: palette.black,
  textGray: palette.gray600,
  textPrimary: palette.primary,
  textSuccess: palette.success,
  textDanger: palette.error,
  textInfo: palette.info,
  textWarning: palette.warning,
  //icon
  iconLight: palette.white,
  iconDark: palette.dark1,
  iconWhite: palette.white,
  iconBlack: palette.black,
  iconGray: palette.gray600,
  iconPrimary: palette.primary,
  iconSuccess: palette.success,
  iconDanger: palette.error,
  iconInfo: palette.info,
  iconWarning: palette.warning,
  //button
  buttonLight: palette.white,
  buttonDark: palette.dark1,
  buttonWhite: palette.white,
  buttonBlack: palette.black,
  buttonGray: palette.gray600,
  buttonPrimary: palette.primary,
  buttonSuccess: palette.success,
  buttonDanger: palette.error,
  buttonInfo: palette.info,
  buttonWarning: palette.warning,
  // divider
  divider: palette.gray200,

  //touchable
  touchable: hexToRgba(palette.gray300, 0.4),

  /////////
  //background
  foregroundMain: palette.gray50,
  inputBackground: palette.gray50,
  iconButton: palette.white,
  iconButtonBorder: palette.gray200,

  //card
  cardLight: palette.white,

  //shadow
  shadow: palette.black,

  //header
  headerBorder: palette.gray300,

  //tabBar
  tabBarBorder: palette.gray300,
  activeTabBarIcon: palette.primary,
  inactiveTabBarIcon: palette.gray900,

  // input
  inputBorder: palette.gray300,
  primaryInputBorder: palette.primary,
  inputPlaceholder: palette.gray400,
};
