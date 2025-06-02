'use client'

import {Card, Field, Stack, Textarea, NativeSelect, Text, VStack} from "@chakra-ui/react";
import {Products} from "@/components/invoice-form/products";
import discountOptions from "@/data/discounts";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {discount, notes, selectDiscount, selectNotes} from "@/lib/features/ivoicing/invoicingSlice";

export const InvoiceData = () => {
    const dispatch = useAppDispatch();
    const notesValue = useAppSelector(selectNotes);
    const discountValue = useAppSelector(selectDiscount);

    return (
        <Card.Root flex="1">
            <Card.Header>Products</Card.Header>
            <Card.Body>
                <Stack gap="4">
                    <Products/>

                    <VStack gap="1" align="flex-start" width="full">
                        <Text as="label" fontSize="sm" fontWeight="semibold">
                            Discount
                        </Text>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                defaultValue={discountValue.numeric}
                                bg="bg"
                                aria-label="Select discount"
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
                        <Field.Label>Notes</Field.Label>
                        <Textarea
                            resize="vertical"
                            placeholder="Add any notes you need..."
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
