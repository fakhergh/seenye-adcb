import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';

import { Box } from '@/components/ui/Box/Box';
import { SettingItem } from '@/components/ui/SettingItem/SettingItem';
import { Typography } from '@/components/ui/Typography/Typography';
import { BiometricSettingItemContainer } from '@/containers/BiometricSettingItemContainer/BiometricSettingItemContainer';
import { useClearFavorites } from '@/core/services/FavoriteService';
import { useBiometrics } from '@/hooks/useBiometrics';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { RootStackParams } from '@/types/navigation';

interface ProfileScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Profile'> {}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { t } = useI18nTranslation('screens.ProfileScreen');
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const { isAvailable } = useBiometrics();

  const clearFavorites = useClearFavorites();

  const logout = useCallback(async () => {
    try {
      await signOut(getAuth());
    } finally {
      clearFavorites();
    }
  }, [clearFavorites]);

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
        {isAvailable && <BiometricSettingItemContainer user={user} />}
        <Box height={1} bg="borderGrayLight" mx="md" />
        <SettingItem
          icon="power-off-filled"
          title={t('settings.logout')}
          onPress={logout}
        />
      </Box>
    </Box>
  );
}
