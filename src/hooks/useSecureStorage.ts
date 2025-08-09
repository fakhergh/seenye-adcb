import { useCallback } from 'react';
import * as Keychain from 'react-native-keychain';

import { KEYCHAIN_TOKEN_SERVICE_KEY } from '@/constants/config';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';

const baseOptions: Pick<Keychain.BaseOptions, 'service'> = {
  service: KEYCHAIN_TOKEN_SERVICE_KEY,
};

export function useSecureStorage() {
  const { t } = useI18nTranslation('hooks.useSecureStorage');

  const saveCredentials = useCallback(
    async (username: string, password: string) => {
      try {
        await Keychain.setGenericPassword(username, password, {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
          storage: Keychain.STORAGE_TYPE.RSA,
          ...baseOptions,
        });
        return true;
      } catch (error) {
        console.log('Error saving credentials:', error);
        return false;
      }
    },
    [],
  );

  const getCredentials = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: t('getCredentials.title'),
          subtitle: t('getCredentials.subTitle'),
          description: t('getCredentials.description'),
          cancel: t('getCredentials.buttons.cancel'),
        },
        ...baseOptions,
      });
      return credentials || null;
    } catch (error) {
      console.log('Error retrieving credentials:', error);
      return null;
    }
  }, [t]);

  const resetCredentials = useCallback(async () => {
    try {
      await Keychain.resetGenericPassword(baseOptions);
      return true;
    } catch (error) {
      console.log('Error resetting credentials:', error);
      return false;
    }
  }, []);

  return { saveCredentials, getCredentials, resetCredentials };
}
