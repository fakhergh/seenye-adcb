import { useTheme } from '@shopify/restyle';
import { useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { EventCardListItemContainer } from '@/containers/EventCardListItemContainer/EventCardListItemContainer';
import { useGetFavorites } from '@/core/services/favoriteService';
import { Event } from '@/core/types/event';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';

export function FavoritesScreen() {
  const { spacing } = useTheme<Theme>();

  const favorites = useGetFavorites();

  const contentContainerStyle = useMemo(
    () => ({
      paddingHorizontal: spacing['2xl'],
      paddingVertical: spacing.lg,
      gap: spacing.lg,
    }),
    [spacing],
  );

  const renderItem: ListRenderItem<Event> = useCallback(
    ({ item }) => (
      <EventCardListItemContainer
        id={item.id}
        title={item.name}
        imageUrl={item.imageUrl}
        dateTime={item.date}
      />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Event) => item.id, []);

  return (
    <Screen component="box">
      <FlatList
        contentContainerStyle={contentContainerStyle}
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Screen>
  );
}
