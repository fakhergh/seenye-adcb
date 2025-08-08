import { useMMKVString } from 'react-native-mmkv';

import { FAVORITES_STORAGE_KEY } from '@/constants/config';
import { storage } from '@/core/lib/storage';
import { Event } from '@/core/types/event';

function getStoredFavorites(): string {
  return storage.getString(FAVORITES_STORAGE_KEY) ?? '{}';
}

export function useGetFavorites(): Event[] {
  const [storedFavorites = '{}'] = useMMKVString(
    FAVORITES_STORAGE_KEY,
    storage,
  );

  return Object.values(JSON.parse(storedFavorites));
}

export function useAddFavorite() {
  return function (event: Event) {
    const state = getStoredFavorites();

    const parsedState = JSON.parse(state);
    parsedState[event.id] = event;

    storage.set(FAVORITES_STORAGE_KEY, JSON.stringify(parsedState));
  };
}

export function useDeleteFavorite() {
  return function (eventId: string) {
    const state = getStoredFavorites();

    const parsedState = JSON.parse(state);

    if (parsedState[eventId]) {
      delete parsedState[eventId];
      storage.set(FAVORITES_STORAGE_KEY, JSON.stringify(parsedState));
    }
  };
}
