'use client'

import {Card, Field, Stack, Textarea, NativeSelect, Text, VStack} from "@chakra-ui/react";
import {Products} from "@/components/invoice-form/products";
import discountOptions from "@/data/discounts";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {discount, notes, selectDiscount, selectNotes} from "@/lib/features/ivoicing/invoicingSlice";
import {useTranslations} from "next-intl";

export const InvoiceData = () => {
    const t = useTranslations('Products')
    const dispatch = useAppDispatch();
    const notesValue = useAppSelector(selectNotes);
    const discountValue = useAppSelector(selectDiscount);

    return (
        <Card.Root flex="1" width="full">
            <Card.Header>{t('title')}</Card.Header>
            <Card.Body>
                <Stack gap="4">
                    <Products/>

                    <VStack gap="1" align="flex-start" width="full">
                        <Text as="label" fontSize="sm" fontWeight="semibold">
                            {t('discountTitle')}
                        </Text>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                defaultValue={discountValue.numeric}
                                bg="bg"
                                aria-label={t('selectDiscount')}
                                onChange={(e) => {
                                    const discountItem = discountOptions.find((d) => d.numeric === Number(e.target.value))
                                    if (discountItem) {
                                        dispatch(discount(discountItem))
                                    }
                                }}
                            >
                                {discountOptions.map((option) => (
                                    <option key={option.value} value={option.numeric}>
                                        {option.label}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </VStack>

                    <Field.Root>
                        <Field.Label>{t('notes')}</Field.Label>
                        <Textarea
                            resize="vertical"
                            placeholder={t('notesPlaceholder')}
                            minH="100px"
                            value={notesValue}
                            onChange={(e) => dispatch(notes(e.target.value))}
                        />
                    </Field.Root>
                </Stack>
            </Card.Body>
        </Card.Root>
    )
}
