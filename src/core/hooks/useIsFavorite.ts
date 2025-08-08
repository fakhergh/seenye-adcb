import { useMMKVString } from 'react-native-mmkv';

import { FAVORITES_STORAGE_KEY } from '@/constants/config';
import { storage } from '@/core/lib/storage';

export function useIsFavorite(id: string): boolean {
  const [storedFavorites] = useMMKVString(FAVORITES_STORAGE_KEY, storage);

  return JSON.parse(storedFavorites ?? '{}').hasOwnProperty(id);
}
