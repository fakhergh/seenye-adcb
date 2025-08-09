import { useTranslation } from 'react-i18next';

export function useI18nTranslation(namespace: string) {
  const [nsp, fragment] = namespace.split('.');

  const { t, ...rest } = useTranslation(nsp);
  return { ...rest, t: (key: string) => t(`${fragment}.${key}`) };
}
