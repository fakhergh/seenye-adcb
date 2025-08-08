export interface BaseFieldProps {
  name: string;
}

export interface BaseFormProps<T> {
  loading?: boolean;
  initialValues?: T;
  onSubmit: (values: T) => void;
}
