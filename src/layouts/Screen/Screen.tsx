import { BoxProps, useTheme } from '@shopify/restyle';
import { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import {
  ScrollView,
  ScrollViewProps,
} from '@/components/ui/ScrollView/ScrollView';
import { Theme } from '@/styles';

type ExtendedType =
  | ({ component?: 'box'; loading?: boolean } & BoxProps<Theme>)
  | ({ component?: 'scrollView'; loading?: boolean } & ScrollViewProps);

export type ScreenProps = { children?: ReactNode } & ExtendedType;

export function Screen({
  loading,
  children,
  component,
  ...props
}: ScreenProps) {
  const { iconColors } = useTheme<Theme>();

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator color={iconColors.primary} />
      </Box>
    );
  }

  switch (component) {
    case 'scrollView':
      return (
        <ScrollView flexGrow={1} bg="backgroundLight" {...props}>
          {children}
        </ScrollView>
      );
    case 'box':
    default:
      return (
        <Box flex={1} bg="backgroundLight" {...props}>
          {children}
        </Box>
      );
  }
}
