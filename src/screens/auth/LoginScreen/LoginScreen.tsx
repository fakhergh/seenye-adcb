import {
  FirebaseAuthTypes,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import {
  LoginForm,
  LoginFormValues,
} from '@/components/forms/LoginForm/LoginForm';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { IconFaceIdFilled } from '@/components/ui/Icon/icons/filled/IconFaceIdFilled';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Typography } from '@/components/ui/Typography/Typography';
import { KEYBOARD_AVOIDING_VIEW_BEHAVIOUR } from '@/constants/config';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { useBiometricSession } from '@/hooks/useBiometricSession';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { Screen } from '@/layouts/Screen/Screen';
import { Theme } from '@/styles';
import { RootStackParams } from '@/types/navigation';
import { responsiveValue } from '@/utils/resizer';

interface LoginScreenProps
  extends NativeStackScreenProps<RootStackParams, 'Login'> {}

export const LoginScreen = withSafeAreaView(function LoginScreen({
  navigation: { push },
}: LoginScreenProps) {
  const { iconColors, colors } = useTheme<Theme>();

  const { t } = useI18nTranslation('screens.LoginScreen');

  const [biometricUserId] = useBiometricSession();
  const { getCredentials } = useSecureStorage();

  const onBiometricsLogin = useCallback(async () => {
    try {
      const userCredentials = await getCredentials();
      console.log('userCredentials: ', userCredentials);

      if (userCredentials) {
        await signInWithEmailAndPassword(
          getAuth(),
          userCredentials.username,
          userCredentials.password,
        );
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }, [getCredentials]);

  const onSubmit = useCallback(async (values: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(
        getAuth(),
        values.email,
        values.password,
      );
    } catch (error: any) {
      console.log(error);
      const { code } = error as FirebaseAuthTypes.NativeFirebaseAuthError;

      if (code === 'auth/invalid-credential') {
        console.log('invalid creds');
      }
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={KEYBOARD_AVOIDING_VIEW_BEHAVIOUR}>
      <Screen px="lg" pt="lg" component="scrollView" bounces={false}>
        <Box flex={1} g="lg" justifyContent="center">
          <Box alignItems="center" mb="3xl">
            <IconAppLogo
              width={responsiveValue(96)}
              height={responsiveValue(96)}
              color={colors.iconPrimary}
            />
          </Box>

          <LoginForm onSubmit={onSubmit} />
          {!!biometricUserId && (
            <Button
              leftIcon={IconFaceIdFilled}
              leftIconColor={iconColors.white}
              onPress={onBiometricsLogin}>
              {t('buttons.biometricsLogin')}
            </Button>
          )}
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
            dynamicHeight
            px="none"
            variant="text"
            color="primary"
            onPress={() => push('Register')}>
            {t('buttons.register')}
          </Button>
        </Box>
      </Screen>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
