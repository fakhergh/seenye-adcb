import { useCallback, useEffect, useState } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';

import { useI18nTranslation } from '@/hooks/useI18nTranslation';

const biometrics = new ReactNativeBiometrics();

export function useBiometrics() {
  const { t } = useI18nTranslation('hooks.useBiometricAuth');

  const authenticate = useCallback(
    async (promptMessage = t('authenticate.prompt.authenticate')) => {
      const rnBiometrics = new ReactNativeBiometrics();

      try {
        const { success } = await rnBiometrics.simplePrompt({
          promptMessage,
          cancelButtonText: t('authenticate.buttons.cancel'),
        });

        return success;
      } catch (error) {
        console.log('Biometric auth failed:', error);
        return false;
      }
    },
    [t],
  );

  const [isAvailable, setAvailable] = useState(false);

  const checkBiometric = useCallback(async () => {
    try {
      const result = await biometrics.isSensorAvailable();
      setAvailable(result.available);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    checkBiometric().catch(console.log);
  }, [checkBiometric]);

  return { isAvailable, authenticate };
}
