import { useTheme } from '@shopify/restyle';
import { DateTime } from 'luxon';

import { Box } from '@/components/ui/Box/Box';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Image } from '@/components/ui/Image/Image';
import { Touchable } from '@/components/ui/Touchable/Touchable';
import { Typography } from '@/components/ui/Typography/Typography';
import { Theme } from '@/styles';
import { formatDate } from '@/utils/date';

export interface EventCardListItemProps {
  title: string;
  imageUrl: string;
  dateTime: string;
  isFavorite?: boolean;
  onPress?: () => void;
  onFavoriteToggle?: (b: boolean) => void;
}

export function EventCardListItem({
  title,
  imageUrl,
  dateTime,
  onPress,
  isFavorite,
  onFavoriteToggle,
}: EventCardListItemProps) {
  const { iconColors } = useTheme<Theme>();
  return (
    <Touchable
      borderColor="borderGrayLight"
      borderWidth={1}
      borderRadius="lg"
      overflow="hidden"
      onPress={onPress}>
      <Image aspectRatio={2} bg="backgroundGray" source={{ uri: imageUrl }} />
      <Box px="md" py="md" flexDirection="row">
        <Box flex={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="bodySmall">
            {formatDate(dateTime, undefined, DateTime.DATE_MED)}
          </Typography>
        </Box>
        <IconButton
          size="md"
          iconName={isFavorite ? 'bookmark-filled' : 'bookmark-outlined'}
          color={isFavorite ? iconColors.primary : iconColors.dark}
          onPress={() => onFavoriteToggle?.(!isFavorite)}
        />
      </Box>
    </Touchable>
  );
}
