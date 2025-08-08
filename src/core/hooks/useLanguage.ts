import { useMMKVString } from 'react-native-mmkv';

import { LANGUAGE_STORAGE_KEY } from '@/constants/config';
import { storage } from '@/core/lib/storage';

type Language = 'en' | 'ar';

export function useLanguage(): [string | undefined, (value: Language) => void] {
  return useMMKVString(LANGUAGE_STORAGE_KEY, storage);
}
