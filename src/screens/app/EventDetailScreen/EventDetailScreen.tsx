import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback, useEffect, useMemo } from 'react';
import { Marker } from 'react-native-maps';

import { Box } from '@/components/ui/Box/Box';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Image } from '@/components/ui/Image/Image';
import { MapView } from '@/components/ui/MapView/MapView';
import { Typography } from '@/components/ui/Typography/Typography';
import { useGetEvent } from '@/core/services/eventService';
import {
  useAddFavorite,
  useDeleteFavorite,
} from '@/core/services/favoriteService';
import { useIsFavorite } from '@/hooks/useIsFavorite';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { AppStackParams } from '@/types/navigation';
import { formatDate } from '@/utils/date';

interface EventDetailScreenProps
  extends NativeStackScreenProps<AppStackParams, 'EventDetail'> {}

export function EventDetailScreen({
  navigation: { setOptions },
  route: { params },
}: EventDetailScreenProps) {
  const { iconColors } = useTheme<Theme>();
  const { data, isLoading } = useGetEvent(params.id);

  const isFavorite = useIsFavorite(params.id);

  const addFavorite = useAddFavorite();

  const deleteFavorite = useDeleteFavorite();

  const coordinate = useMemo(
    () => ({
      latitude: data?.venue.location.latitude!,
      longitude: data?.venue.location.longitude!,
    }),
    [data?.venue.location.latitude, data?.venue.location.longitude],
  );

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      deleteFavorite(params.id);
    } else {
      addFavorite({ id: data?.id, imageUrl: data?.imageUrl, date: data?.date });
    }
  }, [data, addFavorite, deleteFavorite, isFavorite, params.id]);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <IconButton
          px="none"
          size="md"
          iconName={isFavorite ? 'bookmark-filled' : 'bookmark-outlined'}
          color={isFavorite ? 'primary' : 'dark'}
          onPress={toggleFavorite}
        />
      ),
    });
  }, [isFavorite, setOptions, toggleFavorite]);

  return (
    <Screen component="scrollView" loading={isLoading} g="sm" py="md">
      <Image aspectRatio={1.5} source={{ uri: data?.imageUrl }} />
      <Box px="sm">
        <Typography variant="h5">{data?.name}</Typography>
      </Box>
      <Box px="sm" my="xs" g="sm">
        <Box flexDirection="row" alignItems="center" g="xs">
          <Icon name="clock-filled" width={20} height={20} color="warning" />
          <Typography variant="bodyMedium">
            {formatDate(data?.date!)}
          </Typography>
        </Box>
        <Box flexDirection="row" alignItems="center" g="xs">
          <Icon name="flag-filled" width={20} height={20} color="success" />
          <Typography variant="bodyMedium">{data?.venue.name}</Typography>
        </Box>
        <Box flexDirection="row" alignItems="center" g="xs">
          <Icon
            name="location-pin-filled"
            width={20}
            height={20}
            color="error"
          />
          <Box flex={1}>
            <Typography variant="bodyMedium">
              {data?.venue?.address}, {data?.venue?.city},{' '}
              {data?.venue?.country}
            </Typography>
          </Box>
        </Box>
      </Box>

      <MapView
        rotateEnabled={false}
        scrollEnabled={false}
        zoomEnabled={false}
        aspectRatio={2}
        region={{ ...coordinate, latitudeDelta: 0.005, longitudeDelta: 0.005 }}>
        <Marker coordinate={coordinate}>
          <Icon
            name="location-pin-filled"
            width={48}
            height={48}
            color={iconColors.error}
          />
        </Marker>
      </MapView>
    </Screen>
  );
}

//
