import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, View } from 'react-native';

import { RootStackParams } from '@/types/navigation';

interface ProfileScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Profile'> {}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  return (
    <View>
      <Button title="Favorites" onPress={() => navigation.push('Favorites')} />
      <Button title="Logout" onPress={() => navigation.replace('Login')} />
    </View>
  );
}
