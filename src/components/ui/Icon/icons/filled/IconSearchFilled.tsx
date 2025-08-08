import { Circle, Path, Svg } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconSearchFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 18 19" fill="none" {...props}>
      <Circle
        cx="8.80589"
        cy="8.80541"
        r="7.49047"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0156 14.4043L16.9523 17.3334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
