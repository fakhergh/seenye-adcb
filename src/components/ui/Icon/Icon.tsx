import { useTheme } from '@shopify/restyle';
import { FC, useMemo } from 'react';
import { I18nManager } from 'react-native';

import { IconBookmarkFilled } from '@/components/ui/Icon/icons/filled/IconBookmarkFilled';
import { IconChevronLeftFilled } from '@/components/ui/Icon/icons/filled/IconChevronLeftFilled';
import { IconChevronRight } from '@/components/ui/Icon/icons/filled/IconChevronRight';
import { IconClockFilled } from '@/components/ui/Icon/icons/filled/IconClockFilled';
import { IconEarthFilled } from '@/components/ui/Icon/icons/filled/IconEarthFilled';
import { IconFaceIdFilled } from '@/components/ui/Icon/icons/filled/IconFaceIdFilled';
import { IconHomeFilled } from '@/components/ui/Icon/icons/filled/IconHomeFilled';
import { IconLocationPinFilled } from '@/components/ui/Icon/icons/filled/IconLocationPinFilled';
import { IconPowerOffFilled } from '@/components/ui/Icon/icons/filled/IconPowerOffFilled';
import { IconSearchFilled } from '@/components/ui/Icon/icons/filled/IconSearchFilled';
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
  | 'user-circular-filled'
  | 'search-filled'
  | 'location-pin-filled'
  | 'chevron-left-filled'
  | 'chevron-right-filled'
  | 'clock-filled'
  | 'earth-filled'
  | 'face-id-filled'
  | 'power-off-filled';

export type VariousIconName = 'app-logo';

const IconByName: Record<
  IconOutlinedName | IconFilledName | VariousIconName,
  FC<BaseIconProps>
> = {
  //Filled icons
  'home-filled': IconHomeFilled,
  'bookmark-filled': IconBookmarkFilled,
  'user-circular-filled': IconUserCircularFilled,
  'search-filled': IconSearchFilled,
  'location-pin-filled': IconLocationPinFilled,
  'chevron-left-filled': IconChevronLeftFilled,
  'chevron-right-filled': IconChevronRight,
  'clock-filled': IconClockFilled,
  'earth-filled': IconEarthFilled,
  'face-id-filled': IconFaceIdFilled,
  'power-off-filled': IconPowerOffFilled,

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
