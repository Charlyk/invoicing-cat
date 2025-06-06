'use client'

import {
  Button,
  CloseButton,
  Dialog,
  DialogRootProps,
  Field,
  Input,
  NativeSelect,
  Portal,
  Text,
  VStack
} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import currencies from "@/data/currencies";
import supportedLocales from "@/data/locales";
import {Client} from "@/lib/db";
import {useEffect, useState} from "react";

export interface ClientFormDialogProps extends Omit<DialogRootProps, 'children'> {
  client?: Client | null
  isLoading?: boolean;
  onClose?: () => void
  onSave?: (client: Client) => void
}

export const ClientFormDialog = (props: ClientFormDialogProps) => {
  const {client: clientToEdit} = props;
  const t = useTranslations('ClientFormDialog')
  const [isNameValid, setNameValid] = useState<boolean>(true)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [locale, setLocale] = useState<string>(supportedLocales[0].value)
  const [currency, setCurrency] = useState<string>(currencies[0].code)

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name ?? '')
      setEmail(clientToEdit.email ?? '')
      setLocale(clientToEdit.locale ?? supportedLocales[0].value)
      setCurrency(clientToEdit.currency ?? currencies[0].code)
    }
  }, [clientToEdit]);

  const onSave = () => {
    if (name.length === 0) {
      return setNameValid(false)
    }

    const client: Client = {
      id: clientToEdit?.id ?? undefined,
      name: name,
      email: email,
      locale: locale,
      currency: currency,
    }

    props.onSave?.(client)

    setNameValid(true)
    setName('')
    setEmail('')
    setLocale('')
    setCurrency('')
  }

  return (
    <Dialog.Root {...props}>
      <Portal>
        <Dialog.Backdrop/>
        <Dialog.Positioner px={4}>
          <Dialog.Content colorPalette="orange">
            <Dialog.Header>
              <Dialog.Title>{t('addTitle')}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack gap={2}>
                <Field.Root invalid={!isNameValid}>
                  <Field.Label>{t('name')}</Field.Label>
                  <Input
                    type="text"
                    value={name}
                    placeholder="John Doe"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>{t('email')}</Field.Label>
                  <Input
                    type="email"
                    value={email}
                    placeholder="john.doe@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field.Root>
                <VStack gap="1" align="flex-start" flex="1" width="full">
                  <Text as="label" fontSize="sm" fontWeight="medium">
                    {t('locale')}
                  </Text>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      defaultValue={locale}
                      bg="bg"
                      aria-label={t('selectCurrency')}
                      onChange={(e) => {
                        const localeItem = supportedLocales.find((c) => c.value === e.target.value)
                        if (localeItem) {
                          setLocale(localeItem.value)
                        }
                      }}
                    >
                      {supportedLocales.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} - {option.value}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator/>
                  </NativeSelect.Root>
                </VStack>
                <VStack gap="1" align="flex-start" flex="1" width="full">
                  <Text as="label" fontSize="sm" fontWeight="medium">
                    {t('currency')}
                  </Text>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      defaultValue={currency}
                      bg="bg"
                      aria-label={t('selectCurrency')}
                      onChange={(e) => {
                        const currencyItem = currencies.find((c) => c.code === e.target.value)
                        if (currencyItem) {
                          setCurrency(currencyItem.code)
                        }
                      }}
                    >
                      {currencies.map((option) => (
                        <option key={option.code} value={option.code}>
                          {option.code} - {option.name} ({option.symbol})
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator/>
                  </NativeSelect.Root>
                </VStack>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={props.onClose} variant="outline">
                {t('cancel')}
              </Button>
              <Button onClick={onSave} loading={props.isLoading}>
                {t('save')}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={() => {
                props.onClose?.()
              }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
