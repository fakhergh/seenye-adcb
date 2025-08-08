import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconClockFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 22 23" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11 1.5C5.063 1.5.25 6.313.25 12.25S5.063 23 11 23s10.75-4.813 10.75-10.75S16.937 1.5 11 1.5Zm.75 6.75a.75.75 0 0 0-1.5 0v4.206c0 .319-.122.625-.34.857l-1.456 1.544a.75.75 0 1 0 1.092 1.029L11 14.342a2.75 2.75 0 0 0 .749-1.886V8.25Z"
        clipRule="evenodd"
      />
      <Path
        fill={color}
        d="M4.969 1.836A.75.75 0 1 0 4.03.664l-2.5 2a.75.75 0 1 0 .938 1.172l2.5-2ZM17.968.664a.75.75 0 0 0-.936 1.172l2.5 2a.75.75 0 1 0 .936-1.172l-2.5-2Z"
      />
    </Svg>
  );
}
