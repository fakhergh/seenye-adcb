import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useMemo } from 'react';
import { Platform, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/Box/Box';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { Theme } from '@/styles';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export interface SearchHeaderProps {
  searchText?: string;
  onSearchTextChange: (text: string) => void;
}

export function SearchHeader({
  searchText,
  onSearchTextChange,
}: SearchHeaderProps) {
  const { goBack } = useNavigation();

  const { colors, spacing } = useTheme<Theme>();

  const insets = useSafeAreaInsets();

  const { t, i18n } = useI18nTranslation('components.SearchHeader');

  const searchInputStyle = useMemo(
    () => ({
      flex: 1,
      height: 40,
      color: colors.textBlack,
      backgroundColor: colors.backgroundGray,
      borderRadius: spacing.md,
      paddingHorizontal: spacing.lg,
      marginLeft: spacing.md,
    }),
    [colors.backgroundGray, colors.textBlack, spacing.lg, spacing.md],
  );

  return (
    <Box
      style={{ marginTop: insets.top }}
      height={HEADER_HEIGHT}
      bg="backgroundLight"
      flexDirection="row"
      alignItems="center"
      px="lg">
      <IconButton
        size="sm"
        p="none"
        iconName="chevron-left-filled"
        color="primary"
        onPress={() => goBack()}
      />

      <TextInput
        style={searchInputStyle}
        selectionColor={colors.textPrimary}
        placeholderTextColor={colors.textGray}
        autoFocus
        textAlign={i18n.language === 'ar' ? 'right' : 'left'}
        placeholder={t('placeholders.search')}
        value={searchText}
        onChangeText={onSearchTextChange}
      />
    </Box>
  );
}
