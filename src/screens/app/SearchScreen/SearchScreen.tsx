import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  TextInput,
} from 'react-native';

import { Box } from '@/components/ui/Box/Box';
import { EventCardListItemContainer } from '@/containers/EventCardListItemContainer/EventCardListItemContainer';
import { useGetEvents } from '@/core/services/EventService';
import { Event } from '@/core/types/event';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { useDebounce } from '@/hooks/useDebounce';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';

interface SearchScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Search'> {}

export const SearchScreen = withSafeAreaView(function SearchScreen({
  navigation: { setOptions },
}: SearchScreenProps) {
  const { t, i18n } = useI18nTranslation('screens.SearchScreen');

  const { colors, spacing } = useTheme<Theme>();

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
    fetchNextPage().catch(console.error);
  }, [fetchNextPage, hasNextPage, isLoading]);

  const listFooterComponent = isFetchingNextPage ? (
    <Box>
      <ActivityIndicator />
    </Box>
  ) : null;

  const searchInputStyle = useMemo(
    () => ({
      height: Platform.select({ ios: 40, default: 48 }),
      color: colors.textBlack,
    }),
    [colors.textBlack],
  );

  useEffect(() => {
    setOptions({
      headerBackTitle: '',
      headerTitle: () => (
        <Box flex={1} ml="md" px="md" bg="backgroundGray" borderRadius="md">
          <TextInput
            style={searchInputStyle}
            selectionColor={colors.textPrimary}
            placeholderTextColor={colors.textGray}
            autoFocus
            textAlign={i18n.language === 'ar' ? 'right' : 'left'}
            placeholder={t('placeholders.search')}
            onChangeText={setQuery}
          />
        </Box>
      ),
    });
  }, [
    colors.textGray,
    colors.textPrimary,
    i18n.language,
    searchInputStyle,
    setOptions,
    t,
  ]);

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
