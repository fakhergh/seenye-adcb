import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { Box } from '@/components/ui/Box/Box';
import { SettingItem } from '@/components/ui/SettingItem/SettingItem';
import { Typography } from '@/components/ui/Typography/Typography';
import { RootStackParams } from '@/types/navigation';

interface ProfileScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Profile'> {}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { t } = useTranslation('ProfileScreen');

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
          Fakher Ghouili
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
          value={false}
        />
        <Box height={1} bg="borderGrayLight" mx="md" />
        <SettingItem
          icon="power-off-filled"
          title={t('settings.logout')}
          onPress={() => navigation.replace('Login')}
        />
      </Box>
    </Box>
  );
}
