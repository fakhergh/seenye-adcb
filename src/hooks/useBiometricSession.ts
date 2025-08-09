import { useMMKVString } from 'react-native-mmkv';

import { BIOMETRIC_AUTH_SESSION_STORAGE_KEY } from '@/constants/config';

export function useBiometricSession() {
  return useMMKVString(BIOMETRIC_AUTH_SESSION_STORAGE_KEY);
}
