import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconLocationPinFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 16 21" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M10.78 18.7C13.09 15.756 16 11.477 16 8.61 16 3.854 12.418 0 8 0S0 3.854 0 8.609c0 2.867 2.91 7.146 5.22 10.092 1.204 1.536 1.807 2.305 2.78 2.305.973 0 1.576-.769 2.78-2.305ZM8 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
