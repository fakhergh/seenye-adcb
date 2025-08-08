import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

import {
  Language,
  LanguageSettingItem,
} from '@/components/ui/LanguageSettingItem/LanguageSettingItem';
import { useLanguage } from '@/core/hooks/useLanguage';
import { Screen } from '@/layouts/Screen/Screen';

export function LanguageSettingScreen() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation('LanguageSettingScreen');
  const [, setLanguage] = useLanguage();

  const changeAppLanguage = useCallback(
    async (nextLanguage: Language) => {
      if (language !== nextLanguage) {
        setLanguage(nextLanguage);
        await changeLanguage(nextLanguage);

        const isArabic = nextLanguage === 'ar';
        I18nManager.allowRTL(isArabic);
        I18nManager.forceRTL(isArabic);

        RNRestart.restart();
      }
    },
    [changeLanguage, language, setLanguage],
  );

  return (
    <Screen component="scrollView" px="xl" py="md">
      <LanguageSettingItem
        title={t('options.english')}
        value="en"
        selected={language === 'en'}
        onPress={changeAppLanguage}
      />
      <LanguageSettingItem
        title={t('options.arabic')}
        value="ar"
        selected={language === 'ar'}
        onPress={changeAppLanguage}
      />
    </Screen>
  );
}
