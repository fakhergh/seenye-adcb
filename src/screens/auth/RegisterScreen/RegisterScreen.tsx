import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useTranslation } from 'react-i18next';

import { RegisterForm } from '@/components/forms/RegisterForm/RegisterForm';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Typography } from '@/components/ui/Typography/Typography';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';
import { responsiveValue } from '@/utils/resizer';

interface RegisterScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Register'> {}

export const RegisterScreen = withSafeAreaView(function RegisterScreen({
  navigation,
}: RegisterScreenProps) {
  const { colors } = useTheme<Theme>();

  const { t } = useTranslation('RegisterScreen');

  return (
    <Screen px="lg" pt="lg" bounces={false} component="scrollView">
      <Box flex={1} g="lg" justifyContent="center">
        <Box alignItems="center" mb="3xl">
          <IconAppLogo
            width={responsiveValue(96)}
            height={responsiveValue(96)}
            color={colors.iconPrimary}
          />
        </Box>

        <RegisterForm onSubmit={() => navigation.replace('HomeTab')} />
      </Box>

      <Box
        g="sm"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        <Typography color="dark" variant="bodyMedium">
          {t('labels.login')}
        </Typography>
        <Button
          variant="text"
          color="primary"
          onPress={() => navigation.goBack()}
          px="none">
          {t('buttons.login')}
        </Button>
      </Box>
    </Screen>
  );
});
