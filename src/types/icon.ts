import { StyleProp, ViewStyle } from 'react-native';

import { Theme } from '@/styles';

export interface IconProps {
  width?: number;
  height?: number;
  color?: keyof Theme['iconColors'] | string;
  style?: StyleProp<ViewStyle>;
}
