import {
  BoxProps,
  boxRestyleFunctions,
  composeRestyleFunctions,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import { Fragment, useMemo } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { Typography } from '@/components/ui/Typography/Typography';
import { Theme } from '@/styles';
import { responsiveValue } from '@/utils/resizer';

export interface ButtonProps
  extends Omit<TouchableOpacityProps, 'activeOpacity'>,
    BoxProps<Theme> {
  children?: string | Array<string | undefined>;
  variant?: keyof Theme['buttonVariants'];
  color?: 'primary' | 'dark' | 'danger';
  leftIcon?: any;
  leftIconColor?: string;
}

const composedFunctions = composeRestyleFunctions(boxRestyleFunctions);

export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  leftIcon: LeftIcon,
  leftIconColor,
  ...props
}: ButtonProps) {
  const restyle = useRestyle<Theme, any, any>(composedFunctions, props);

  const { spacing, buttonVariants, borderRadii } = useTheme<Theme>();

  const style = useMemo<StyleProp<ViewStyle>>(
    () => ({
      gap: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveValue(48),
      borderRadius: borderRadii?.md,
      paddingHorizontal: spacing.lg,
      ...buttonVariants[variant][color],
      ...restyle.style[0],
    }),
    [
      borderRadii?.md,
      buttonVariants,
      color,
      restyle.style,
      spacing.lg,
      spacing.sm,
      variant,
    ],
  );

  const textStyle = useMemo(
    () => ({ color: buttonVariants[variant][color].color }),
    [buttonVariants, color, variant],
  );

  return (
    <TouchableOpacity activeOpacity={0.6} {...props} style={style}>
      {!!LeftIcon && <LeftIcon width={24} height={24} color={leftIconColor} />}
      <Typography textAlign="center" variant="button" style={textStyle}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <Fragment key={index}>{child}</Fragment>
            ))
          : children}
      </Typography>
    </TouchableOpacity>
  );
}
