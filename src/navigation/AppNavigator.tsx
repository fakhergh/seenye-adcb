import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';

import { RootStack } from '@/navigation/RootStack';
import { Theme } from '@/styles';

export function AppNavigator() {
  const { colors } = useTheme<Theme>();

  return (
    <NavigationContainer onReady={BootSplash.hide}>
      <StatusBar
        backgroundColor={colors.backgroundLight}
        barStyle="dark-content"
      />
      <RootStack />
    </NavigationContainer>
  );
}
