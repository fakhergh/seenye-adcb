import { useCallback, useState } from 'react';
import Dialog from 'react-native-dialog';

import { useI18nTranslation } from '@/hooks/useI18nTranslation';

export interface BiometricDialogProps {
  visible?: boolean;
  onConfirm?: (text: string) => void;
  onClose?: () => void;
}

export function BiometricDialog({
  visible,
  onConfirm,
  onClose,
}: BiometricDialogProps) {
  const { t } = useI18nTranslation('components.BiometricDialog');

  const [value, setValue] = useState<string>('');

  const handleClose = useCallback(() => {
    setValue('');
    onClose?.();
  }, [onClose]);

  const handleConfirm = useCallback(() => {
    onConfirm?.(value);
    handleClose();
  }, [handleClose, onConfirm, value]);

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{t('title')}</Dialog.Title>
      <Dialog.Description>{t('description')}</Dialog.Description>
      <Dialog.Input
        autoFocus
        secureTextEntry
        value={value}
        onChangeText={setValue}
      />
      <Dialog.Button label={t('buttons.cancel')} onPress={handleClose} />
      <Dialog.Button label={t('buttons.confirm')} onPress={handleConfirm} />
    </Dialog.Container>
  );
}
