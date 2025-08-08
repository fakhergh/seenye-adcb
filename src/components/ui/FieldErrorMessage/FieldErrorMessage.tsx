import { ErrorMessage } from 'formik';

import { Typography } from '@/components/ui/Typography/Typography';
import { BaseFieldProps } from '@/types/form';

export interface FieldErrorMessageProps extends BaseFieldProps {}

export function FieldErrorMessage({ name }: FieldErrorMessageProps) {
  return (
    <ErrorMessage name={name}>
      {errorMessage => (
        <Typography variant="bodyMedium" color="error">
          {errorMessage}
        </Typography>
      )}
    </ErrorMessage>
  );
}
