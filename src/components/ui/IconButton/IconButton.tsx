import {
  BoxProps,
  boxRestyleFunctions,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';

import { Box } from '@/components/ui/Box/Box';
import { Icon, IconProps } from '@/components/ui/Icon/Icon';
import { Touchable, TouchableProps } from '@/components/ui/Touchable/Touchable';
import { Theme } from '@/styles';
import { responsiveValue } from '@/utils/resizer';

export interface IconButtonProps
  extends Pick<TouchableProps, 'onPress'>,
    Pick<IconProps, 'color'>,
    BoxProps<Theme> {
  iconName: IconProps['name'];
  size?: keyof typeof IconSizeConfig;
  backgroundColor?: any;
}

const IconSizeConfig = {
  xs: responsiveValue(16),
  sm: responsiveValue(20),
  md: responsiveValue(24),
  lg: responsiveValue(30),
  xl: responsiveValue(36),
};

const composedFunctions = composeRestyleFunctions(boxRestyleFunctions);

export function IconButton({
  size = 'md',
  iconName,
  color,
  onPress,
  backgroundColor,
  ...props
}: IconButtonProps) {
  const restyle = useRestyle<Theme, any, any>(composedFunctions, props);

  return (
    <Box borderRadius="rounded" overflow="hidden">
      <Touchable
        p="xs"
        onPress={onPress}
        borderRadius="rounded"
        bg={backgroundColor}
        {...restyle}>
        <Icon
          name={iconName}
          width={IconSizeConfig[size]}
          height={IconSizeConfig[size]}
          color={color}
        />
      </Touchable>
    </Box>
  );
}
