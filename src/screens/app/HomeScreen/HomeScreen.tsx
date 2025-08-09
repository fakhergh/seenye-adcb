import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { EventCardListItemContainer } from '@/containers/EventCardListItemContainer/EventCardListItemContainer';
import { useGetEvents } from '@/core/services/eventService';
import { Event } from '@/core/types/event';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';

interface HomeScreenProps
  extends BottomTabScreenProps<RootStackParams, 'Home'> {}

export function HomeScreen({
  navigation: { setOptions, navigate },
}: HomeScreenProps) {
  const { iconColors, spacing } = useTheme<Theme>();

  const ref = useRef(null);

  useScrollToTop(ref);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetEvents();

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
      headerRight: () => (
        <IconButton
          px="xl"
          size="md"
          iconName="search-filled"
          color="dark"
          onPress={() => navigate('Search')}
        />
      ),
    });
  }, [navigate, setOptions]);

  return (
    <Screen component="box" loading={isLoading}>
      <FlatList
        ref={ref}
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
}
