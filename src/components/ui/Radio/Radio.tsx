import { useTheme } from '@shopify/restyle';
import { useCallback, useMemo } from 'react';

import { IconRadioOff } from '@/components/ui/Radio/icons/IconRadioOff';
import { IconRadioOn } from '@/components/ui/Radio/icons/IconRadioOn';
import { Touchable } from '@/components/ui/Touchable/Touchable';
import { Theme } from '@/styles';
import { responsiveValue } from '@/utils/resizer';

export interface RadioProps {
  value?: boolean;
  onSelect?: () => void;
}

export function Radio({ value, onSelect }: RadioProps) {
  const { iconColors } = useTheme<Theme>();

  const Icon = useMemo(() => (value ? IconRadioOn : IconRadioOff), [value]);

  const onPress = useCallback(() => !value && onSelect?.(), [onSelect, value]);

  return (
    <Touchable onPress={onPress}>
      <Icon
        width={responsiveValue(20)}
        height={responsiveValue(20)}
        color={iconColors.primary}
      />
    </Touchable>
  );
}
