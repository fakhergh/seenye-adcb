import { useScrollToTop } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback, useMemo, useRef } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { EventCardListItemContainer } from '@/containers/EventCardListItemContainer/EventCardListItemContainer';
import { useGetEvents } from '@/core/services/EventService';
import { Event } from '@/core/types/event';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';

interface HomeScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Home'> {}

export function HomeScreen({}: HomeScreenProps) {
  const { spacing } = useTheme<Theme>();

  const ref = useRef(null);

  useScrollToTop(ref);

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetEvents();

  const items = useMemo(
    () => data?.pages.flatMap(page => page.items),
    [data?.pages],
  );

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
    <Screen component="box" loading={isLoading}>
      <FlatList
        ref={ref}
        contentContainerStyle={contentContainerStyle}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          if (isLoading || !hasNextPage) return;
          fetchNextPage().catch(console.error);
        }}
      />
    </Screen>
  );
}
