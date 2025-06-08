'use client'

import {
  Card,
  Text,
  Input,
  InputGroup,
  Field,
  VStack,
  HStack,
  Center,
  Image,
  Box,
  Button, Select, createListCollection, Portal
} from '@chakra-ui/react';
import {ChangeEvent, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  dueDate, invoiceNumber, logoFile, selectClient,
  selectDueDate, selectInvoiceNumber, selectLogoFile, selectSenderEmail, selectSenderName,
  selectSubject,
  selectTax, senderEmail, senderName, setClient,
  subject, tax
} from "@/lib/features/ivoicing/invoicingSlice";
import {LuImageUp, LuPlus, LuTrash} from "react-icons/lu";
import {useTranslations} from "next-intl";
import {useClients} from "@/lib/db/clients";
import {ClientFormDialog} from "@/components/clients-list/client-form-dialog";

export const InvoiceDetails = () => {
  const t = useTranslations('InvoiceDetails')
  const dispatch = useAppDispatch();
  const {allClients} = useClients()
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const invoiceNumberValue = useAppSelector(selectInvoiceNumber);
  const senderNameValue = useAppSelector(selectSenderName);
  const senderEmailValue = useAppSelector(selectSenderEmail);
  const clientValue = useAppSelector(selectClient)
  const subjectValue = useAppSelector(selectSubject);
  const dueDateValue = useAppSelector(selectDueDate);
  const taxValue = useAppSelector(selectTax);
  const fileValue = useAppSelector(selectLogoFile);
  const inputRef = useRef<HTMLInputElement>(null);

  const clientsCollection = useMemo(() => {
    return createListCollection({
      items: allClients ?? [],
      itemToString: (client) => client.name,
      itemToValue: (client) => `${client.id}`,
    })
  }, [allClients])

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleInputChanged = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)
    const base64 = await fileToBase64(file!)
    dispatch(logoFile(base64))

    // ✅ Clear input to allow re-selecting same file
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // will result in base64 string like "data:image/png;base64,..."
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <>
      <Card.Root flex="1" width="full">
        <Card.Header>{t('title')}</Card.Header>
        <Card.Body>
          <VStack gap="4">
            <HStack
              gap="4"
              width="full"
              align="flex-start"
              verticalAlign="center"
            >
              <input
                ref={inputRef}
                onChange={handleInputChanged}
                id="image-input"
                type="file"
                accept="image/jpeg, image/png"
                style={{display: "none"}}
              />
              {fileValue ? (
                <Box position="relative">
                  <Image
                    src={fileValue}
                    alt="Logo"
                    height="70px"
                    maxW="200px"
                    overflow="hidden"
                    objectFit="contain"
                    objectPosition="center"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={handleImageClick}
                  />
                  <Button
                    position="absolute"
                    colorPalette="red"
                    size="sm"
                    padding={0}
                    top="-2"
                    right="-2"
                    rounded="full"
                    variant="subtle"
                    onClick={(e) => {
                      dispatch(logoFile(null))
                      e.stopPropagation()
                    }}>
                    <LuTrash/>
                  </Button>
                </Box>
              ) : (
                <Center
                  height="70px"
                  width="70px"
                  borderWidth={2}
                  borderColor="border.emphasized"
                  borderRadius="md"
                  color="border.emphasized"
                  cursor="pointer"
                  padding={4}
                  onClick={handleImageClick}
                >
                  <LuImageUp size={30}/>
                </Center>
              )}
              <VStack align="flex-start" alignSelf="center" gap="1" flex="1" width="full">
                <Text alignSelf="start" fontSize="sm"
                      fontWeight="semibold">{t('uploadLogo')}</Text>
                <Text alignSelf="start" fontSize="xs"
                      color="fg.muted">{t('uploadSecureMessage')}</Text>
              </VStack>
            </HStack>
            <Field.Root>
              <Field.Label>{t('invoiceNumber')}</Field.Label>
              <Input
                value={invoiceNumberValue}
                type="text"
                placeholder="#123456"
                onChange={(e) => dispatch(invoiceNumber(e.target.value))}
              />
            </Field.Root>
            <HStack width="full" gap="4">
              <Field.Root>
                <Field.Label>{t('senderName')}</Field.Label>
                <Input
                  value={senderNameValue}
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => dispatch(senderName(e.target.value))}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t('senderEmail')}</Field.Label>
                <Input
                  type="email"
                  placeholder="john.doe@email.com"
                  value={senderEmailValue}
                  onChange={(e) => dispatch(senderEmail(e.target.value))}
                />
              </Field.Root>
            </HStack>
            <HStack width="full" gap="4" align="flex-end">
              <Select.Root
                collection={clientsCollection}
                value={[`${clientValue?.id}`]}
                onValueChange={(e) => {
                  const clientId = e.value[0]
                  const client = allClients.find((client) => `${client.id}` === clientId)
                  dispatch(setClient(client ?? null))
                }}
              >
                <Select.HiddenSelect/>
                <Select.Label>{t('selectClient')}</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={t('selectClient')}/>
                  </Select.Trigger>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {clientsCollection.items.map((client) => (
                        <Select.Item item={client} key={client.name}>
                          {client.name}
                          <Select.ItemIndicator/>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
              <Button variant="subtle" onClick={() => setShowCreateModal(true)}>
                <LuPlus/>
              </Button>
            </HStack>
            <HStack width="full" gap="4">
              <Field.Root>
                <Field.Label>{t('subject')}</Field.Label>
                <Input
                  placeholder="Dashboard design"
                  value={subjectValue}
                  onChange={(e) => dispatch(subject(e.target.value))}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>{t('dueDate')}</Field.Label>
                <Input
                  type="date"
                  placeholder="02 May 2025"
                  defaultValue={dueDateValue}
                  onChange={(e) => dispatch(dueDate(e.target.value))}
                />
              </Field.Root>
            </HStack>
            <HStack width="full" gap="4">
              <Field.Root flex="1">
                <Field.Label>{t('tax')}</Field.Label>
                <InputGroup endElement="%">
                  <Input
                    placeholder="0"
                    type="number"
                    value={taxValue}
                    onChange={(e) => dispatch(tax(Number(e.target.value)))}
                  />
                </InputGroup>
              </Field.Root>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>

      <ClientFormDialog
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSaved={() => setShowCreateModal(false)}
      />
    </>
  )
}
