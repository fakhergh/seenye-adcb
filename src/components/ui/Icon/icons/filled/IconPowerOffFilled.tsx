import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconPowerOffFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fill={color}
        d="M11.75 1a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0V1Z"
      />
      <Path
        fill={color}
        d="M5.45 3.6a.75.75 0 0 0-.9-1.2A10.734 10.734 0 0 0 .25 11c0 5.937 4.813 10.75 10.75 10.75S21.75 16.937 21.75 11c0-3.491-1.732-6.637-4.294-8.596a.75.75 0 1 0-.912 1.192C18.764 5.292 20.25 8.009 20.25 11a9.25 9.25 0 1 1-14.8-7.4Z"
      />
    </Svg>
  );
}
