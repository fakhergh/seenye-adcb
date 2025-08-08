import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconUserCircularFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M.25 11C.25 5.063 5.063.25 11 .25S21.75 5.063 21.75 11c0 3.049-1.27 5.802-3.308 7.757A10.717 10.717 0 0 1 11 21.75c-2.888 0-5.512-1.14-7.442-2.993A10.721 10.721 0 0 1 .25 11Zm16.833 6.968A3.252 3.252 0 0 0 14 15.75H8c-1.434 0-2.652.93-3.083 2.218A9.212 9.212 0 0 0 11 20.25c2.33 0 4.457-.86 6.083-2.282ZM11 3.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
