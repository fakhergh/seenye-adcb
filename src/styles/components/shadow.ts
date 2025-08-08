import { Platform, StyleProp, ViewStyle } from 'react-native';

import { palette } from '@/styles/colors';
import { hexToRgba } from '@/utils/color';

export type ShadowVariants = {
  1: StyleProp<ViewStyle>;
  2: StyleProp<ViewStyle>;
};

export const shadowVariants: ShadowVariants = {
  1: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: hexToRgba(
      palette.black,
      Platform.select({ default: 0.3, ios: 1 }),
    ),
  },
  2: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 0.5,
    shadowColor: palette.black,
  },
};
