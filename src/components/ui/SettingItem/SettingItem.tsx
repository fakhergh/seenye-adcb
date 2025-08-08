import { useTheme } from '@shopify/restyle';
import { ReactNode, useMemo } from 'react';
import { Switch } from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import { Icon, IconProps } from '@/components/ui/Icon/Icon';
import { Touchable } from '@/components/ui/Touchable/Touchable';
import {
  Typography,
  TypographyProps,
} from '@/components/ui/Typography/Typography';
import { Theme } from '@/styles';
import { responsiveValue } from '@/utils/resizer';

export interface SettingItemProps {
  icon: IconProps['name'];
  title: string;
  type?: 'arrow' | 'switch';
  value?: boolean;
  onValueChange?: (v: boolean) => void;
  color?: TypographyProps['color'];
  onPress?: () => void;
  RightAccessory?: () => ReactNode;
}

export function SettingItem({
  icon,
  title,
  color,
  onPress,
  type = 'arrow',
  value,
  RightAccessory,
  onValueChange,
}: SettingItemProps) {
  const { iconColors } = useTheme<Theme>();

  const trackColor = useMemo(
    () => ({ true: iconColors.primary + '77' }), //todo:: update colors value
    [iconColors.primary],
  );

  return (
    <Touchable
      flexDirection="row"
      g="lg"
      p="lg"
      alignItems="center"
      onPress={onPress}
      disabled={type === 'switch'}>
      <Icon
        name={icon}
        width={responsiveValue(22)}
        height={responsiveValue(22)}
        color={color ?? 'dark'}
      />
      <Box flex={1}>
        <Typography variant="bodyLarge" fontWeight="500" color={color}>
          {title}
        </Typography>
      </Box>
      {RightAccessory?.()}
      {type === 'arrow' ? (
        <Icon
          name="chevron-right-filled"
          color={color ?? 'dark'}
          width={responsiveValue(16)}
          height={responsiveValue(16)}
        />
      ) : (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={trackColor}
          thumbColor={value ? iconColors.primary : undefined}
        />
      )}
    </Touchable>
  );
}
