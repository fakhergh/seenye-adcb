import {
  composeRestyleFunctions,
  typography,
  TypographyProps as BaseTypographyProps,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import { ReactNode, useMemo } from 'react';
import { Text, TextProps as BaseTextProps, ViewStyle } from 'react-native';

import { Theme } from '@/styles';
import { TextVariant, TextVariants } from '@/styles/components/typography';

export interface TypographyProps
  extends BaseTextProps,
    Omit<BaseTypographyProps<Theme>, 'color' | 'variant'> {
  variant?: keyof TextVariants;
  color?: keyof TextVariant;
  children?: ReactNode;
}

const composedFunctions = composeRestyleFunctions([typography]);

export function Typography({
  color = 'dark',
  variant = 'defaults',
  children,
  ...props
}: TypographyProps) {
  const { typographyVariants } = useTheme<Theme>();

  const restyle = useRestyle<Theme, any, any>(composedFunctions, props);

  const textVariant = typographyVariants[variant][color];

  const textStyle = useMemo(
    () => ({
      textAlign: 'left',
      ...textVariant,
      ...Object.assign({}, ...restyle.style),
      ...(props.style as ViewStyle),
    }),
    [props.style, restyle.style, textVariant],
  );

  return (
    <Text {...props} style={textStyle}>
      {children}
    </Text>
  );
}
