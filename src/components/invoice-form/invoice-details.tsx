'use client'

import {Card, Text, Input, InputGroup, Field, VStack, HStack, NativeSelect} from '@chakra-ui/react';
import currencies from "@/data/currencies";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    clientEmail,
    clientName,
    currency,
    dueDate, invoiceNumber,
    selectClientEmail,
    selectClientName,
    selectCurrency,
    selectDueDate, selectInvoiceNumber,
    selectSubject,
    selectTax,
    subject, tax
} from "@/lib/features/ivoicing/invoicingSlice";

export const InvoiceDetails = () => {
    const dispatch = useAppDispatch();
    const invoiceNumberValue = useAppSelector(selectInvoiceNumber);
    const clientNameValue = useAppSelector(selectClientName);
    const clientEmailValue = useAppSelector(selectClientEmail);
    const subjectValue = useAppSelector(selectSubject);
    const dueDateValue = useAppSelector(selectDueDate);
    const currencyValue = useAppSelector(selectCurrency);
    const taxValue = useAppSelector(selectTax);

    return (
        <Card.Root flex="1" width="full">
            <Card.Header>Invoice Details</Card.Header>
            <Card.Body>
                <VStack gap="4">
                    <Field.Root>
                        <Field.Label>Invoice number</Field.Label>
                        <Input
                            value={invoiceNumberValue}
                            type="text"
                            placeholder="#123456"
                            onChange={(e) => dispatch(invoiceNumber(e.target.value))}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Client Name</Field.Label>
                        <Input
                            value={clientNameValue}
                            type="text"
                            placeholder="John Doe"
                            onChange={(e) => dispatch(clientName(e.target.value))}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>Client Email</Field.Label>
                        <Input
                            type="email"
                            placeholder="john.doe@email.com"
                            value={clientEmailValue}
                            onChange={(e) => dispatch(clientEmail(e.target.value))}
                        />
                        <Field.HelperText>Optional</Field.HelperText>
                    </Field.Root>
                    <HStack width="full" gap="4">
                        <Field.Root>
                            <Field.Label>Subject</Field.Label>
                            <Input
                                placeholder="Dashboard design"
                                value={subjectValue}
                                onChange={(e) => dispatch(subject(e.target.value))}
                            />
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Due date</Field.Label>
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
                                Currency
                            </Text>
                            <NativeSelect.Root>
                                <NativeSelect.Field
                                    defaultValue={currencyValue.code}
                                    bg="bg"
                                    aria-label="Select discount"
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
                                <NativeSelect.Indicator />
                            </NativeSelect.Root>
                        </VStack>
                        <Field.Root flex="1">
                            <Field.Label>Tax %</Field.Label>
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
