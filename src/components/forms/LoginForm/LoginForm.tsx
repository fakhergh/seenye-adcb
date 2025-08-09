import { Formik } from 'formik';

import { InputField } from '@/components/fields/InputField/InputField';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { yup } from '@/core/lib/yup';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { BaseFormProps } from '@/types/form';

export interface LoginFormValues {
  email: string;
  password: string;
}

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};

export interface LoginFormProps
  extends Omit<BaseFormProps<LoginFormValues>, 'action'> {}

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export function LoginForm({
  initialValues = defaultValues,
  loading,
  onSubmit,
}: LoginFormProps) {
  const { t } = useI18nTranslation('components.LoginForm');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Box g="lg">
          <InputField
            name="email"
            placeholder={t('inputs.email')}
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!loading}
          />
          <InputField
            name="password"
            placeholder={t('inputs.password')}
            secureTextEntry
            editable={!loading}
          />
          <Button onPress={() => handleSubmit()} disabled={loading}>
            {t('buttons.login')}
          </Button>
        </Box>
      )}
    </Formik>
  );
}
