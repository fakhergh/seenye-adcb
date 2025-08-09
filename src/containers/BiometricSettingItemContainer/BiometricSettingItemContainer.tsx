import {
  FirebaseAuthTypes,
  getAuth,
  validatePassword,
} from '@react-native-firebase/auth';
import { useCallback, useState } from 'react';

import { BiometricDialog } from '@/components/ui/BiometricDialog/BiometricDialog';
import { SettingItem } from '@/components/ui/SettingItem/SettingItem';
import { useBiometrics } from '@/hooks/useBiometrics';
import { useBiometricSession } from '@/hooks/useBiometricSession';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { useSecureStorage } from '@/hooks/useSecureStorage';

export interface BiometricSettingItemContainerProps {
  user: FirebaseAuthTypes.User | null;
}

export function BiometricSettingItemContainer({
  user,
}: BiometricSettingItemContainerProps) {
  const [visible, setVisible] = useState(false);
  const [biometricUserId, setBiometricUserId] = useBiometricSession();

  const { authenticate } = useBiometrics();

  const { saveCredentials, resetCredentials } = useSecureStorage();

  const { t } = useI18nTranslation('containers.BiometricSettingItemContainer');

  const enableBiometricLogin = useCallback(
    async (password: string) => {
      const passwordValidationStatus = await validatePassword(
        getAuth(),
        password,
      );

      if (passwordValidationStatus.isValid) {
        const isAuthenticated = await authenticate();
        if (isAuthenticated) {
          await saveCredentials(user?.email!, password);
          setBiometricUserId(user?.uid);
        }
      }
    },
    [authenticate, saveCredentials, setBiometricUserId, user],
  );

  const onToggleBiometricsLogin = useCallback(
    async (enabled: boolean) => {
      try {
        if (enabled && user) {
          setVisible(true);
        } else {
          await resetCredentials();
          setBiometricUserId(undefined);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [resetCredentials, setBiometricUserId, user],
  );

  return (
    <>
      <SettingItem
        icon="face-id-filled"
        title={t('title')}
        type="switch"
        value={!!biometricUserId}
        onValueChange={onToggleBiometricsLogin}
      />
      <BiometricDialog
        visible={visible}
        onConfirm={enableBiometricLogin}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
