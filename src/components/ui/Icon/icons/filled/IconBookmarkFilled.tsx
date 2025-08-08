import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types/icon';

export function IconBookmarkFilled({ color, ...props }: IconProps) {
  return (
    <Svg viewBox="0 0 14 19" fill="none" {...props}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="M.245 3.455C0 4.208 0 5.139 0 7v7.387c0 1.918 0 2.876.342 3.383a2 2 0 0 0 1.888.868c.607-.07 1.335-.694 2.79-1.941.641-.55.962-.824 1.314-.949a2 2 0 0 1 1.332 0c.352.125.673.4 1.313.949 1.456 1.247 2.184 1.871 2.791 1.941a2 2 0 0 0 1.888-.868c.342-.507.342-1.465.342-3.383V7c0-1.861 0-2.792-.245-3.545a5 5 0 0 0-3.21-3.21C9.792 0 8.861 0 7 0S4.208 0 3.455.245a5 5 0 0 0-3.21 3.21ZM4 5.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H4Z"
        clipRule="evenodd"
      />
    </Svg>
  );
}
