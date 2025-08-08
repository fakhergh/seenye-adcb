import { useTheme } from '@shopify/restyle';
import { useMemo } from 'react';
import { I18nManager, TextInput, TextInputProps } from 'react-native';

import { Theme } from '@/styles';
import { responsiveValue } from '@/utils/resizer';

export interface InputProps extends TextInputProps {
  headerHeight?: number;
}

export const inputHeight = responsiveValue(56);

export function Input({ headerHeight, ...props }: InputProps) {
  const { typographyVariants, spacing, colors, borderRadii } =
    useTheme<Theme>();

  const style = useMemo<TextInputProps['style']>(
    () => ({
      height: headerHeight ?? inputHeight,
      borderRadius: borderRadii.md,
      paddingHorizontal: spacing.lg,
      backgroundColor: colors.inputBackground,
      ...typographyVariants.input.dark,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
    }),
    [
      borderRadii.md,
      colors.inputBackground,
      headerHeight,
      spacing.lg,
      typographyVariants.input.dark,
    ],
  );

  return (
    <TextInput
      style={style}
      placeholderTextColor={colors.inputPlaceholder}
      {...props}
    />
  );
}
