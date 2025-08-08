import { createTheme } from '@shopify/restyle';

import { colors } from '@/styles/colors';
import { ButtonVariants, buttonVariants } from '@/styles/components/button';
import { iconColors } from '@/styles/components/icon';
import { ShadowVariants, shadowVariants } from '@/styles/components/shadow';
import {
  TextVariants,
  typographyVariants,
} from '@/styles/components/typography';
import { responsiveValue } from '@/utils/resizer';

export type AppTheme = {
  typographyVariants: TextVariants;
  buttonVariants: ButtonVariants;
  shadowVariants: ShadowVariants;
};

const baseTheme = {
  spacing: {
    none: 0,
    xs: responsiveValue(4),
    sm: responsiveValue(8),
    md: responsiveValue(12),
    lg: responsiveValue(16),
    xl: responsiveValue(20),
    '2xl': responsiveValue(24),
    '3xl': responsiveValue(40),
    '4xl': responsiveValue(48),
  },
  borderRadii: {
    none: 0,
    xs: responsiveValue(4),
    sm: responsiveValue(8),
    md: responsiveValue(12),
    lg: responsiveValue(16),
    xl: responsiveValue(20),
    '2xl': responsiveValue(24),
    '3xl': responsiveValue(32),
    rounded: responsiveValue(1000),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  colors: {},
};

const theme = createTheme({
  ...baseTheme,
  iconColors,
  colors,
  typographyVariants,
  buttonVariants,
  shadowVariants,
});

export type Theme = typeof theme;

export { theme };
