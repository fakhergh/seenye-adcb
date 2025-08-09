import { Platform } from 'react-native';

export const KEYCHAIN_TOKEN_SERVICE_KEY = 'firebase_auth';

export const BIOMETRIC_AUTH_SESSION_STORAGE_KEY = '@biometric_auth_session';

export const LANGUAGE_STORAGE_KEY = '@language';

export const FAVORITES_STORAGE_KEY = '@favorites';

export const KEYBOARD_AVOIDING_VIEW_BEHAVIOUR = Platform.select<
  'height' | 'padding'
>({
  android: 'height',
  ios: 'padding',
});
