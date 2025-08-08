import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/components/forms/LoginForm/LoginForm';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Typography } from '@/components/ui/Typography/Typography';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';
import { responsiveValue } from '@/utils/resizer';

interface LoginScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Login'> {}

export const LoginScreen = withSafeAreaView(function LoginScreen({
  navigation,
}: LoginScreenProps) {
  const { colors } = useTheme<Theme>();

  const { t } = useTranslation('LoginScreen');

  return (
    <Screen px="lg" pt="lg" component="scrollView" bounces={false}>
      <Box flex={1} g="lg" justifyContent="center">
        <Box alignItems="center" mb="3xl">
          <IconAppLogo
            width={responsiveValue(96)}
            height={responsiveValue(96)}
            color={colors.iconPrimary}
          />
        </Box>

        <LoginForm
          loading={false}
          onSubmit={() => navigation.replace('HomeTab')}
        />
      </Box>

      <Box
        flexDirection="row"
        g="sm"
        justifyContent="center"
        alignItems="center">
        <Typography color="dark" variant="bodyMedium">
          {t('labels.register')}
        </Typography>
        <Button
          px="none"
          variant="text"
          color="primary"
          onPress={() => navigation.push('Register')}>
          {t('buttons.register')}
        </Button>
      </Box>
    </Screen>
  );
});
