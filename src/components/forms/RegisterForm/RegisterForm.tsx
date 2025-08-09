import { Formik } from 'formik';

import { InputField } from '@/components/fields/InputField/InputField';
import { Box } from '@/components/ui/Box/Box';
import { Button } from '@/components/ui/Button/Button';
import { yup } from '@/core/lib/yup';
import { useI18nTranslation } from '@/hooks/useI18nTranslation';
import { BaseFormProps } from '@/types/form';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormProps extends BaseFormProps<RegisterFormValues> {}

const defaultValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export function RegisterForm({
  initialValues = defaultValues,
  loading,
  onSubmit,
}: RegisterFormProps) {
  const { t } = useI18nTranslation('components.RegisterForm');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Box g="lg">
          <InputField
            name="name"
            placeholder={t('inputs.name')}
            editable={!loading}
          />
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
          <Box mt="lg">
            <Button onPress={() => handleSubmit()} disabled={loading}>
              {t('buttons.register')}
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
