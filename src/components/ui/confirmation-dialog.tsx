'use client'

import {Button, CloseButton, Dialog, DialogRootProps, Portal} from "@chakra-ui/react"
import {useTranslations} from "next-intl";

export interface ConfirmationDialogProps extends Omit<DialogRootProps, 'children'> {
  title: string
  message: string
  isLoading?: boolean;
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const t = useTranslations('ConfirmationDialog')
  const {title, message, onConfirm, onCancel} = props;
  return (
    <Dialog.Root {...props}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={4}>
          <Dialog.Content colorPalette="orange">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                {message}
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onCancel}>
                  {t('cancel')}
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={onConfirm}>{t('confirm')}</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
