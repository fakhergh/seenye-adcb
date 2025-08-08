import { NavigationContainer } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';

import { RootStack } from '@/navigation/RootStack';

export function AppNavigator() {
  return (
    <NavigationContainer onReady={BootSplash.hide}>
      <RootStack />
    </NavigationContainer>
  );
}
