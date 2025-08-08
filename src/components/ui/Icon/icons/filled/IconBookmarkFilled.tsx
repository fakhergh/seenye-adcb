import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconBookmarkFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.245 6.455C5 7.208 5 8.139 5 10v7.387c0 1.918 0 2.876.342 3.383a2 2 0 0 0 1.888.868c.607-.07 1.335-.694 2.79-1.941.641-.55.962-.824 1.314-.949a2 2 0 0 1 1.332 0c.352.125.673.4 1.313.948 1.456 1.248 2.184 1.872 2.791 1.942a2 2 0 0 0 1.888-.868c.342-.507.342-1.465.342-3.383V10c0-1.861 0-2.792-.245-3.545a5 5 0 0 0-3.21-3.21C14.792 3 13.861 3 12 3s-2.792 0-3.545.245a5 5 0 0 0-3.21 3.21ZM9 8.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
