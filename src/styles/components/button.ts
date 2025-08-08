import { palette } from '@/styles/colors';

type ButtonVariantColor = {
  backgroundColor: string;
  color: string;
  borderWidth?: number;
  borderColor?: string;
};

export type ButtonVariant = {
  primary: ButtonVariantColor;
  danger: ButtonVariantColor;
  dark: ButtonVariantColor;
};

export type ButtonVariants = {
  contained: ButtonVariant;
  outlined: ButtonVariant;
  text: ButtonVariant;
};

export const buttonVariants: ButtonVariants = {
  contained: {
    primary: {
      backgroundColor: palette.primary,
      color: palette.white,
    },
    danger: {
      backgroundColor: palette.error,
      color: palette.white,
    },
    dark: {
      backgroundColor: palette.dark1,
      color: palette.white,
    },
  },
  outlined: {
    primary: {
      backgroundColor: palette.transparent,
      borderWidth: 1,
      borderColor: palette.primary,
      color: palette.primary,
    },
    danger: {
      backgroundColor: palette.transparent,
      borderWidth: 1,
      borderColor: palette.error,
      color: palette.error,
    },
    dark: {
      backgroundColor: palette.transparent,
      borderWidth: 1,
      borderColor: palette.dark1,
      color: palette.dark1,
    },
  },
  text: {
    primary: {
      backgroundColor: palette.transparent,
      color: palette.primary,
    },
    danger: {
      backgroundColor: palette.transparent,
      color: palette.error,
    },
    dark: {
      backgroundColor: palette.transparent,
      color: palette.dark1,
    },
  },
};
