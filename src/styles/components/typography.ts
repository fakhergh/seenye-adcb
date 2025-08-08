import { palette } from '@/styles/colors';
import { responsiveValue } from '@/utils/resizer';

type FontWeight = '700' | '600' | '500' | '400';

export type TextVariantColor = {
  fontSize: number;
  fontWeight: FontWeight;
  lineHeight?: number;
  color: string;
};

export type TextVariant = {
  primary: TextVariantColor;
  error: TextVariantColor;
  dark: TextVariantColor;
  gray: TextVariantColor;
  grayLight: TextVariantColor;
  light: TextVariantColor;
  white: TextVariantColor;
  black: TextVariantColor;
};

export type TextVariants = {
  h1: TextVariant;
  h2: TextVariant;
  h3: TextVariant;
  h4: TextVariant;
  h5: TextVariant;
  h6: TextVariant;
  bodyXLarge: TextVariant;
  bodyLarge: TextVariant;
  bodyMedium: TextVariant;
  bodySmall: TextVariant;
  bodyXSmall: TextVariant;
  button: TextVariant;
  input: TextVariant;
  defaults: TextVariant;
};

function createTextVariant(
  fontSize: number,
  fontWeight: FontWeight,
  lineHeight: number,
) {
  lineHeight;
  return {
    fontSize: responsiveValue(fontSize),
    fontWeight,
    lineHeight,
  };
}

function generateTypographyVariant(
  fontSize: number,
  fontWeight: FontWeight,
  lineHeight: number,
  mode?: 'light' | 'dark',
): TextVariant {
  const colors = {
    primary: palette.primary,
    error: palette.error,
    dark: mode === 'dark' ? palette.white : palette.gray900,
    gray: mode === 'dark' ? palette.gray400 : palette.gray600,
    grayLight: mode === 'dark' ? palette.gray300 : palette.gray500,
    light: mode === 'dark' ? palette.gray900 : palette.white,
    black: palette.black,
    white: palette.white,
  };

  return {
    primary: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.primary,
    },
    error: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.error,
    },
    dark: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.dark,
    },
    gray: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.gray,
    },
    grayLight: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.grayLight,
    },
    light: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.light,
    },
    white: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.white,
    },
    black: {
      ...createTextVariant(fontSize, fontWeight, lineHeight),
      color: colors.black,
    },
  };
}

function generateTypographyVariants(mode: 'light' | 'dark'): TextVariants {
  return {
    h1: generateTypographyVariant(32, '700', 40, mode),
    h2: generateTypographyVariant(28, '600', 36, mode),
    h3: generateTypographyVariant(24, '600', 32, mode),
    h4: generateTypographyVariant(20, '600', 28, mode),
    h5: generateTypographyVariant(18, '500', 24, mode),
    h6: generateTypographyVariant(16, '500', 22, mode),
    bodyXLarge: generateTypographyVariant(18, '400', 28, mode),
    bodyLarge: generateTypographyVariant(16, '400', 24, mode),
    bodyMedium: generateTypographyVariant(14, '400', 20, mode),
    bodySmall: generateTypographyVariant(13, '400', 18, mode),
    bodyXSmall: generateTypographyVariant(11, '600', 16, mode),
    button: generateTypographyVariant(16, '600', 18, mode),
    input: generateTypographyVariant(16, '500', 18, mode),
    defaults: generateTypographyVariant(16, '500', 24, mode),
  };
}

export const typographyVariants: TextVariants =
  generateTypographyVariants('light');
