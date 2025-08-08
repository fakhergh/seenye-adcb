import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';

import { HomeTab } from '@/navigation/HomeTab';
import { EventDetailScreen } from '@/screens/app/EventDetailScreen/EventDetailScreen';
import { FavoritesScreen } from '@/screens/app/FavoritesScreen/FavoritesScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen/RegisterScreen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  const { colors } = useTheme<Theme>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.backgroundLight },
      }}>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ title: 'EventDetail' }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favorites' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
