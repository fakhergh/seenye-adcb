import { STORAGE_ENCRYPTION_KEY } from '@env';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'seenye-storage',
  encryptionKey: STORAGE_ENCRYPTION_KEY,
});
