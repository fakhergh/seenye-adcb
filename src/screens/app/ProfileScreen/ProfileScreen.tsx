import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signOut,
  validatePassword,
} from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';

import { Box } from '@/components/ui/Box/Box';
import { SettingItem } from '@/components/ui/SettingItem/SettingItem';
import { Typography } from '@/components/ui/Typography/Typography';
import { KEYCHAIN_TOKEN_SERVICE_KEY } from '@/constants/config';
import { useBiometricAuthSession } from '@/core/hooks/useBiometricAuthSession';
import { useClearFavorites } from '@/core/services/FavoriteService';
import { RootStackParams } from '@/types/navigation';

interface ProfileScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Profile'> {}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { t } = useTranslation('ProfileScreen');
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [biometricUserId, setBiometricUserId] = useBiometricAuthSession();

  const clearFavorites = useClearFavorites();

  const enableBiometricsLogin = useCallback(
    async (password: string) => {
      const passwordValidationStatus = await validatePassword(
        getAuth(),
        password,
      );
      if (passwordValidationStatus.isValid) {
        await Keychain.setGenericPassword(user?.email!, password, {
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
          securityLevel: Keychain.SECURITY_LEVEL.SECURE_HARDWARE,
          service: KEYCHAIN_TOKEN_SERVICE_KEY,
        });
        setBiometricUserId(user?.uid);
      }
    },
    [setBiometricUserId, user],
  );

  const disableBiometricsLogin = useCallback(async () => {
    await Keychain.resetGenericPassword({
      service: KEYCHAIN_TOKEN_SERVICE_KEY,
    });
  }, []);

  const showPasswordValidationAlert = useCallback(() => {
    Alert.prompt(
      'Activate Biometric Authentication',
      'Enter your password to confirm the activation of the biometric authentication',
      enableBiometricsLogin,
      'secure-text',
      '',
    );
  }, [enableBiometricsLogin]);

  const onToggleBiometricsLogin = useCallback(
    async (enabled: boolean) => {
      try {
        if (enabled && user) {
          showPasswordValidationAlert();
        } else {
          await disableBiometricsLogin();
          setBiometricUserId(undefined);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [
      disableBiometricsLogin,
      setBiometricUserId,
      showPasswordValidationAlert,
      user,
    ],
  );

  useEffect(() => {
    return onAuthStateChanged(getAuth(), usr => {
      if (usr) setUser(usr);
    });
  }, [user]);

  return (
    <Box p="md" g="4xl">
      <Box alignItems="center" gap="sm" mt="2xl">
        <Box
          bg="backgroundGray"
          borderRadius="rounded"
          width={100}
          aspectRatio={1}
        />
        <Typography variant="bodyXLarge" fontWeight="500">
          {user?.displayName}
        </Typography>
      </Box>

      <Box bg="backgroundGray" borderRadius="md">
        <SettingItem
          icon="bookmark-filled"
          title={t('settings.favorites')}
          onPress={() => navigation.push('Favorites')}
        />
        <Box height={1} bg="borderGrayLight" mx="md" />
        <SettingItem
          icon="earth-filled"
          title={t('settings.languageSettings')}
          onPress={() => navigation.push('LanguageSetting')}
        />
        <Box height={1} bg="borderGrayLight" mx="md" />
        <SettingItem
          icon="face-id-filled"
          title={t('settings.biometricAuthentication')}
          type="switch"
          value={!!biometricUserId}
          onValueChange={onToggleBiometricsLogin}
        />
        <Box height={1} bg="borderGrayLight" mx="md" />
        <SettingItem
          icon="power-off-filled"
          title={t('settings.logout')}
          onPress={async () => {
            try {
              await signOut(getAuth());
            } finally {
              clearFavorites();
            }
          }}
        />
      </Box>
    </Box>
  );
}
