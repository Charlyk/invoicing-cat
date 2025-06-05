'use client'

import {
    Box,
    Flex,
    FormatNumber,
    SimpleGrid,
    Text,
    type FlexProps, Input, VStack, Button, Field, HStack,
} from '@chakra-ui/react'
import type { ProductData } from './types'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {removeItem, selectCurrency, updateItem} from "@/lib/features/ivoicing/invoicingSlice";
import {LuTrash} from "react-icons/lu";
import {useTranslations} from "next-intl";

interface ProductProps extends FlexProps {
    data: ProductData
}

export const Product = (props: ProductProps) => {
    const t = useTranslations('Product')
    const { data } = props
    const dispatch = useAppDispatch();
    const currency = useAppSelector(selectCurrency);

    return (
        <Box>
            <VStack gap="2" align="flex-start" hideFrom="md">
                <Field.Root>
                    <Field.Label>{t('name')}</Field.Label>
                    <Input
                        placeholder={t('name')}
                        value={data.title}
                        onChange={(e) => {
                            dispatch(updateItem({...data, title: e.target.value}))
                        }}
                    />
                </Field.Root>

                <HStack>
                    <Field.Root>
                        <Field.Label>{t('quantity')}</Field.Label>
                        <Input
                            type="number"
                            placeholder={t('quantity')}
                            value={data.quantity}
                            onChange={(e) => {
                                dispatch(updateItem({...data, quantity: Math.max(0, Number(e.target.value))}))
                            }}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label>{t('price')}</Field.Label>
                        <Input
                            placeholder={t('price')}
                            type="number"
                            value={data.price}
                            onChange={(e) => {
                                dispatch(updateItem({...data, price: Math.max(0, Number(e.target.value))}))
                            }}
                        />
                    </Field.Root>
                </HStack>

                <HStack gap="4" justify="space-between" width="full" align="center">
                    <Box flex="1" alignContent="center">
                        <Text fontWeight="semibold" fontSize="sm">
                            {t('total')}{' '}
                            <FormatNumber
                                value={data.price * data.quantity}
                                style="currency"
                                currency={currency.code}
                            />
                        </Text>
                    </Box>

                    <Button colorPalette="red" alignSelf="center" variant="subtle" onClick={() => dispatch(removeItem(data))}>
                        <LuTrash/>
                    </Button>
                </HStack>
            </VStack>
            <SimpleGrid columns={{ base: 6, md: 14 }} gap="1" hideBelow="md">
                <Flex gridColumn="span 7" gap="4" alignContent="center">
                    <Input
                        placeholder={t('name')}
                        value={data.title}
                        onChange={(e) => {
                            dispatch(updateItem({...data, title: e.target.value}))
                        }}
                    />
                </Flex>

                <Box gridColumn="span 2" hideBelow="md" alignContent="center">
                    <Input
                        type="number"
                        placeholder={t('quantity')}
                        value={data.quantity}
                        onChange={(e) => {
                            dispatch(updateItem({...data, quantity: Math.max(0, Number(e.target.value))}))
                        }}
                    />
                </Box>

                <Box gridColumn="span 2" hideBelow="md" alignContent="center">
                    <Input
                        placeholder={t('price')}
                        type="number"
                        value={data.price}
                        onChange={(e) => {
                            dispatch(updateItem({...data, price: Math.max(0, Number(e.target.value))}))
                        }}
                    />
                </Box>

                <VStack align="flex-end" gridColumn="span 2" gap="8">
                    <Box flex="1" alignContent="center">
                        <Text fontWeight="semibold" fontSize="sm">
                            <FormatNumber
                                value={data.price * data.quantity}
                                style="currency"
                                currency={currency.code}
                            />
                        </Text>
                    </Box>
                </VStack>

                <Box gridColumn="span 1" hideBelow="md" alignContent="center">
                    <Button colorPalette="red" variant="plain" onClick={() => dispatch(removeItem(data))}>
                        <LuTrash/>
                    </Button>
                </Box>
            </SimpleGrid>
        </Box>
    )
}
