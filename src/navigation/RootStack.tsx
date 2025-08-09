import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '@/components/ui/IconButton/IconButton';
import { HomeTab } from '@/navigation/HomeTab';
import { EventDetailScreen } from '@/screens/app/EventDetailScreen/EventDetailScreen';
import { FavoritesScreen } from '@/screens/app/FavoritesScreen/FavoritesScreen';
import { LanguageSettingScreen } from '@/screens/app/LanguageSettingScreen/LanguageSettingScreen';
import { SearchScreen } from '@/screens/app/SearchScreen/SearchScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen/RegisterScreen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';
import { uncapitalize } from '@/utils/formatter';

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  const { colors } = useTheme<Theme>();

  const { t } = useTranslation('RootStack');

  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(getAuth(), usr => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });
  }, [initializing, user]);

  if (initializing) return null;

  return (
    <Stack.Navigator
      screenOptions={({ navigation: { goBack }, route: { name } }) => ({
        title: t(`routes.${uncapitalize(name)}.title`),
        headerLeft: () => (
          <IconButton
            size="sm"
            p="none"
            iconName="chevron-left-filled"
            color="dark"
            onPress={() => goBack()}
          />
        ),
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.backgroundLight },
      })}>
      {!user ? (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen
            name="EventDetail"
            component={EventDetailScreen}
            options={{ title: '', headerBackButtonDisplayMode: 'minimal' }}
          />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
          <Stack.Screen
            name="LanguageSetting"
            component={LanguageSettingScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
