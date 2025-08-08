import { Box } from '@/components/ui/Box/Box';
import { Radio } from '@/components/ui/Radio/Radio';
import { Touchable } from '@/components/ui/Touchable/Touchable';
import { Typography } from '@/components/ui/Typography/Typography';

export type Language = 'en' | 'ar';

export interface LanguageSettingItemProps {
  title: string;
  selected?: boolean;
  value: Language;
  onPress?: (value: Language) => void;
}

export function LanguageSettingItem({
  title,
  value,
  selected,
  onPress,
}: LanguageSettingItemProps) {
  return (
    <Touchable
      flexDirection="row"
      alignItems="center"
      py="md"
      bg="backgroundLight"
      borderRadius="lg"
      onPress={() => onPress?.(value)}>
      <Box flex={1}>
        <Typography variant="bodyLarge" fontWeight="500" color="dark">
          {title}
        </Typography>
      </Box>
      <Radio value={selected} onSelect={() => onPress?.(value)} />
    </Touchable>
  );
}
