import {
  FirebaseAuthTypes,
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@shopify/restyle';
import { useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as Keychain from 'react-native-keychain';

import { LoginForm } from '@/components/forms/LoginForm/LoginForm';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { IconFaceIdFilled } from '@/components/ui/Icon/icons/filled/IconFaceIdFilled';
import { IconAppLogo } from '@/components/ui/Icon/icons/various/IconAppLogo';
import { Typography } from '@/components/ui/Typography/Typography';
import {
  KEYBOARD_AVOIDING_VIEW_BEHAVIOUR,
  KEYCHAIN_TOKEN_SERVICE_KEY,
} from '@/constants/config';
import { withSafeAreaView } from '@/hocs/withSafeAreaView';
import { useBiometricSession } from '@/hooks/useBiometricSession';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
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

  const onBiometricsLogin = useCallback(async () => {
    try {
      // todo:// i18n
      const userCredentials = await Keychain.getGenericPassword({
        authenticationPrompt: {
          title: 'Biometric Authentication',
          subtitle: 'Log in with Face ID / Touch ID',
          description: 'Authenticate to continue',
          cancel: 'Cancel',
        },
        service: KEYCHAIN_TOKEN_SERVICE_KEY,
      });

      if (userCredentials) {
        await signInWithEmailAndPassword(
          getAuth(),
          userCredentials.username,
          userCredentials.password,
        );
      }
    } catch (error) {
      console.log(error);
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

          <LoginForm
            loading={false}
            onSubmit={async values => {
              try {
                await signInWithEmailAndPassword(
                  getAuth(),
                  values.email,
                  values.password,
                );
              } catch (error: any) {
                console.log(error);
                const { code } =
                  error as FirebaseAuthTypes.NativeFirebaseAuthError;

                if (code === 'auth/invalid-credential') {
                  console.log('invalid creds');
                }
              }
            }}
          />
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
