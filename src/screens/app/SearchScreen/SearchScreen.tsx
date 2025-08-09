import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import { SearchHeader } from '@/components/ui/SearchHeader/SearchHeader';
import { EventCardListItemContainer } from '@/containers/EventCardListItemContainer/EventCardListItemContainer';
import { useGetEvents } from '@/core/services/eventService';
import { Event } from '@/core/types/event';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { useDebounce } from '@/hooks/useDebounce';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';

interface SearchScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Search'> {}

export const SearchScreen = withSafeAreaView(function SearchScreen({
  navigation: { setOptions },
}: SearchScreenProps) {
  const { iconColors, spacing } = useTheme<Theme>();

  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 750);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetEvents(
      { keyword: debouncedQuery },
      { enabled: !!debouncedQuery.trim() },
    );

  const items = useMemo(
    () => data?.pages.flatMap(page => page.items),
    [data?.pages],
  );

  const contentContainerStyle = useMemo(
    () => ({
      paddingHorizontal: spacing.xl,
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

  const onEndReached = useCallback(() => {
    if (isLoading || !hasNextPage) return;
    fetchNextPage().catch(console.log);
  }, [fetchNextPage, hasNextPage, isLoading]);

  const listFooterComponent = isFetchingNextPage ? (
    <Box>
      <ActivityIndicator color={iconColors.primary} />
    </Box>
  ) : null;

  useEffect(() => {
    setOptions({
      headerBackTitle: '',
      header: () => <SearchHeader onSearchTextChange={setQuery} />,
    });
  }, [setOptions]);

  return (
    <Screen component="box" loading={isLoading}>
      <FlatList
        keyboardDismissMode="on-drag"
        contentContainerStyle={contentContainerStyle}
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        ListFooterComponent={listFooterComponent}
      />
    </Screen>
  );
});
