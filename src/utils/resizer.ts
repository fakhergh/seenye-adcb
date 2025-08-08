import { RFValue } from 'react-native-responsive-fontsize';

const STANDARD_DEVICE_HEIGHT = 900;

export function responsiveValue(value: number) {
  return RFValue(value, STANDARD_DEVICE_HEIGHT);
}
