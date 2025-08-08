import { useTheme } from '@shopify/restyle';
import { FC, useMemo } from 'react';
import { I18nManager } from 'react-native';

import { IconBookmarkFilled } from '@/components/ui/Icon/icons/filled/IconBookmarkFilled';
import { IconHomeFilled } from '@/components/ui/Icon/icons/filled/IconHomeFilled';
import { IconUserCircularFilled } from '@/components/ui/Icon/icons/filled/IconUserCircularFilled';
import { IconBookmarkOutlined } from '@/components/ui/Icon/icons/outlined/IconBookmarkOutlined';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Theme } from '@/styles';
import { IconColor } from '@/styles/components/icon';
import { IconProps as BaseIconProps } from '@/types/icon';

export type IconOutlinedName = 'bookmark-outlined';

export type IconFilledName =
  | 'home-filled'
  | 'bookmark-filled'
  | 'user-circular-filled';

export type VariousIconName = 'app-logo';

const IconByName: Record<
  IconOutlinedName | IconFilledName | VariousIconName,
  FC<BaseIconProps>
> = {
  //Filled icons
  'home-filled': IconHomeFilled,
  'bookmark-filled': IconBookmarkFilled,
  'user-circular-filled': IconUserCircularFilled,

  //Outlined icons
  'bookmark-outlined': IconBookmarkOutlined,

  //Various icons
  'app-logo': IconAppLogo,
};

export interface IconProps extends Omit<BaseIconProps, 'color'> {
  name: IconOutlinedName | IconFilledName | VariousIconName;
  color?: keyof IconColor | string;
}

export function Icon({ name, color, ...props }: IconProps) {
  const { iconColors } = useTheme<Theme>();

  const BaseIcon = IconByName[name];

  const iconColor =
    color && color in iconColors
      ? iconColors[color as keyof Theme['iconColors']]
      : color;

  const style = useMemo(
    () => ({ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }),
    [],
  );

  return <BaseIcon {...props} color={iconColor} style={style} />;
}
