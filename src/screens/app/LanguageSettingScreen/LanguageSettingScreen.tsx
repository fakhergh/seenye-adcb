import { useCallback } from 'react';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

import {
  Language,
  LanguageSettingItem,
} from '@/components/ui/LanguageSettingItem/LanguageSettingItem';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { useLanguage } from '@/hooks/useLanguage';
import { Screen } from '@/layouts/Screen/Screen';

export function LanguageSettingScreen() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useI18nTranslation('screens.LanguageSettingScreen');
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
