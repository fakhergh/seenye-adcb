import {
  BoxProps,
  boxRestyleFunctions,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import BaseMapView, {
  MapViewProps as BaseMapViewProps,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { Theme } from '@/styles';

export interface MapViewProps
  extends Omit<BaseMapViewProps, 'userInterfaceStyle' | 'provider'>,
    BoxProps<Theme> {}

const composedFunctions = composeRestyleFunctions(boxRestyleFunctions);

export function MapView(props: MapViewProps) {
  const restyle = useRestyle<Theme, MapViewProps, any>(
    composedFunctions,
    props,
  );

  return <BaseMapView provider={PROVIDER_GOOGLE} {...restyle} />;
}
