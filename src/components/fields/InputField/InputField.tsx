import { useField } from 'formik';

import { Box } from '@/components/ui/Box/Box';
import { FieldErrorMessage } from '@/components/ui/FieldErrorMessage/FieldErrorMessage';
import { Input, InputProps } from '@/components/ui/Input/Input';
import { BaseFieldProps } from '@/types/form';

export interface InputFieldProps
  extends BaseFieldProps,
    Omit<InputProps, 'value' | 'onChangeText' | 'onBlur'> {}

export function InputField({ name, ...props }: InputFieldProps) {
  const [{ value, onChange, onBlur }] = useField(name);

  return (
    <Box g="xs">
      <Input
        {...props}
        value={value}
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
      />
      <FieldErrorMessage name={name} />
    </Box>
  );
}
