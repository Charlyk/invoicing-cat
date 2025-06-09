'use client'

import {Card, Field, Stack, Textarea} from "@chakra-ui/react";
import {Products} from "@/components/invoice-form/products";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {notes, selectNotes} from "@/lib/features/ivoicing/invoicingSlice";
import {useTranslations} from "next-intl";

export const InvoiceData = () => {
    const t = useTranslations('Products')
    const dispatch = useAppDispatch();
    const notesValue = useAppSelector(selectNotes);

    return (
        <Card.Root flex="1" width="full">
            <Card.Header>{t('title')}</Card.Header>
            <Card.Body>
                <Stack gap="4">
                    <Products/>
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
