import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from '@/navigation/RootStack';

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
