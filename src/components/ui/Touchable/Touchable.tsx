import {
  all,
  AllProps,
  composeRestyleFunctions,
  useRestyle,
  useTheme,
} from '@shopify/restyle';
import { ReactNode } from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import { Theme } from '@/styles';

export interface TouchableProps
  extends AllProps<Theme>,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps {
  children?: ReactNode | Array<ReactNode>;
}

const composedFunctions = composeRestyleFunctions(all);

export function Touchable({ children, ...props }: TouchableProps) {
  const { colors } = useTheme<Theme>();

  const restyle = useRestyle<Theme, TouchableProps, any>(
    composedFunctions,
    props,
  );

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        {...props}
        background={TouchableNativeFeedback.Ripple(colors.touchable, false)}>
        <Box {...restyle}>{children}</Box>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} {...props} {...restyle}>
      {children}
    </TouchableOpacity>
  );
}
