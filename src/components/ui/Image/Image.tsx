import FastImage, { FastImageProps } from '@d11/react-native-fast-image';
import {
  all,
  AllProps,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';

import { Theme } from '@/styles';

export interface ImageProps extends FastImageProps, AllProps<Theme> {}

const composedFunctions = composeRestyleFunctions(all);

export function Image(props: ImageProps) {
  const restyle = useRestyle<Theme, any, any>(composedFunctions, props);

  return <FastImage {...restyle} />;
}
