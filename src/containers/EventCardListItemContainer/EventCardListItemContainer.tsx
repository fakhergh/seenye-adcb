import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import {
  EventCardListItem,
  EventCardListItemProps,
} from '@/components/ui/EventCardListItem/EventCardListItem';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/core/services/favoriteService';
import { Event } from '@/core/types/event';
import { useIsFavorite } from '@/hooks/useIsFavorite';
import { AppStackParams } from '@/types/navigation';

export interface EventCardListItemContainerProps
  extends EventCardListItemProps {
  id: string;
}

export function EventCardListItemContainer({
  id,
  ...props
}: EventCardListItemContainerProps) {
  const isFavorite = useIsFavorite(id);

  const { navigate } = useNavigation<NavigationProp<AppStackParams>>();

  const addFavorite = useAddFavorite();
  const deleteFavorite = useDeleteFavorite();

  const onFavoriteToggle = useCallback(
    (b: boolean) => {
      if (b) {
        const event: Partial<Event> = {
          id,
          name: props.title,
          date: props.dateTime,
          imageUrl: props.imageUrl,
        };
        addFavorite(event);
      } else deleteFavorite(id);
    },
    [
      id,
      addFavorite,
      deleteFavorite,
      props.dateTime,
      props.imageUrl,
      props.title,
    ],
  );

  return (
    <EventCardListItem
      {...props}
      isFavorite={isFavorite}
      onPress={() => navigate('EventDetail', { id })}
      onFavoriteToggle={onFavoriteToggle}
    />
  );
}
