import { Circle, Svg } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconRadioOff({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 20 21" fill="none" {...props}>
      <Circle cx="10" cy="10.5" r="8.5" stroke={color} strokeWidth="3" />
    </Svg>
  );
}
