'use client'

import {
    Card,
    Text,
    Input,
    InputGroup,
    Field,
    VStack,
    HStack,
    NativeSelect,
    Center,
    Image,
    Box,
    Button
} from '@chakra-ui/react';
import {ChangeEvent, useRef} from 'react';
import currencies from "@/data/currencies";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    clientEmail,
    clientName,
    currency,
    dueDate, invoiceNumber, logoFile,
    selectClientEmail,
    selectClientName,
    selectCurrency,
    selectDueDate, selectInvoiceNumber, selectLogoFile, selectSenderEmail, selectSenderName,
    selectSubject,
    selectTax, senderEmail, senderName,
    subject, tax
} from "@/lib/features/ivoicing/invoicingSlice";
import {useTranslation} from "@/lib/localization";
import {LuImageUp, LuTrash} from "react-icons/lu";

export const InvoiceDetails = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const invoiceNumberValue = useAppSelector(selectInvoiceNumber);
    const senderNameValue = useAppSelector(selectSenderName);
    const senderEmailValue = useAppSelector(selectSenderEmail);
    const clientNameValue = useAppSelector(selectClientName);
    const clientEmailValue = useAppSelector(selectClientEmail);
    const subjectValue = useAppSelector(selectSubject);
    const dueDateValue = useAppSelector(selectDueDate);
    const currencyValue = useAppSelector(selectCurrency);
    const taxValue = useAppSelector(selectTax);
    const fileValue = useAppSelector(selectLogoFile);
    const inputRef = useRef<HTMLInputElement>(null);

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
        <Card.Root flex="1" width="full">
            <Card.Header>{t.invoiceDetails.title}</Card.Header>
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
                                  fontWeight="semibold">{t.invoiceDetails.uploadLogo}</Text>
                            <Text alignSelf="start" fontSize="xs"
                                  color="fg.muted">{t.invoiceDetails.uploadSecureMessage}</Text>
                        </VStack>
                    </HStack>
                    <Field.Root>
                        <Field.Label>{t.invoiceDetails.invoiceNumber}</Field.Label>
                        <Input
                            value={invoiceNumberValue}
                            type="text"
                            placeholder="#123456"
                            onChange={(e) => dispatch(invoiceNumber(e.target.value))}
                        />
                    </Field.Root>
                    <HStack width="full" gap="4">
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.senderName}</Field.Label>
                            <Input
                                value={senderNameValue}
                                type="text"
                                placeholder="John Doe"
                                onChange={(e) => dispatch(senderName(e.target.value))}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.senderEmail}</Field.Label>
                            <Input
                                type="email"
                                placeholder="john.doe@email.com"
                                value={senderEmailValue}
                                onChange={(e) => dispatch(senderEmail(e.target.value))}
                            />
                        </Field.Root>
                    </HStack>
                    <HStack width="full" gap="4">
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.clientName}</Field.Label>
                            <Input
                                value={clientNameValue}
                                type="text"
                                placeholder="John Doe"
                                onChange={(e) => dispatch(clientName(e.target.value))}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.clientEmail}</Field.Label>
                            <Input
                                type="email"
                                placeholder="john.doe@email.com"
                                value={clientEmailValue}
                                onChange={(e) => dispatch(clientEmail(e.target.value))}
                            />
                        </Field.Root>
                    </HStack>
                    <HStack width="full" gap="4">
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.subject}</Field.Label>
                            <Input
                                placeholder="Dashboard design"
                                value={subjectValue}
                                onChange={(e) => dispatch(subject(e.target.value))}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>{t.invoiceDetails.dueDate}</Field.Label>
                            <Input
                                type="date"
                                placeholder="02 May 2025"
                                defaultValue={dueDateValue}
                                onChange={(e) => dispatch(dueDate(e.target.value))}
                            />
                        </Field.Root>
                    </HStack>
                    <HStack width="full" gap="4">
                        <VStack gap="1" align="flex-start" flex="1">
                            <Text as="label" fontSize="sm" fontWeight="semibold">
                                {t.invoiceDetails.currency}
                            </Text>
                            <NativeSelect.Root>
                                <NativeSelect.Field
                                    defaultValue={currencyValue.code}
                                    bg="bg"
                                    aria-label={t.invoiceDetails.selectCurrency}
                                    onChange={(e) => {
                                        const currencyItem = currencies.find((c) => c.code === e.target.value)
                                        if (currencyItem) {
                                            dispatch(currency(currencyItem))
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
                        <Field.Root flex="1">
                            <Field.Label>{t.invoiceDetails.tax}</Field.Label>
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
    )
}
