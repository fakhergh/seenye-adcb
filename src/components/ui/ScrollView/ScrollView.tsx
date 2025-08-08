import {
  BoxProps,
  boxRestyleFunctions,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import * as React from 'react';
import {
  ScrollView as BaseScrollView,
  ScrollViewProps as BaseScrollViewProps,
} from 'react-native';

import { Theme } from '@/styles';

export interface ScrollViewProps extends BaseScrollViewProps, BoxProps<Theme> {}

const composedFunctions = composeRestyleFunctions(boxRestyleFunctions);

export function ScrollView({ ...props }: ScrollViewProps) {
  const restyle = useRestyle<Theme, any, any>(composedFunctions, props);

  return <BaseScrollView {...props} contentContainerStyle={restyle.style[0]} />;
}
