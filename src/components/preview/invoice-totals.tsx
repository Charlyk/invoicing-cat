import {useAppSelector} from "@/lib/hooks";
import {selectCurrency, selectDiscount, selectItems, selectTax} from "@/lib/features/ivoicing/invoicingSlice";
import {FormatNumber, SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {useTranslations} from "next-intl";

export const InvoiceTotals = () => {
    const t = useTranslations('Products')
    const products = useAppSelector(selectItems)
    const currency = useAppSelector(selectCurrency)
    const discount = useAppSelector(selectDiscount)
    const tax = useAppSelector(selectTax)

    const subtotal = products
        .map((item) => item.price * item.quantity)
        .reduce((a, b) => a + b, 0)
    const discountAmount = Math.min(discount.numeric * subtotal, subtotal)
    const taxableBase = Math.max(subtotal - discountAmount, 0)
    const taxAmount = Math.max((tax / 100) * taxableBase, 0)
    const total = Math.max(taxableBase + taxAmount, 0)

    const totals: { title: string; value: string | number }[] = [
        {title: t('subtotal'), value: subtotal},
        ...(discountAmount > 0
            ? [{title: t('discount', {value: discount.value}), value: -discountAmount}]
            : []),
        ...(taxAmount > 0
            ? [{title: t('tax', {value: tax}), value: taxAmount}]
            : []),
        {title: t('total'), value: total}
    ]

    return (
        <Stack width="full">
            {totals.map((item) => (
                <SimpleGrid
                    key={item.title}
                    px="4"
                    columns={14}
                    gap="1"
                >
                    <VStack align="flex-end" gridColumn="span 12">
                        <Text fontWeight="semibold" fontSize="sm">
                            {item.title}
                        </Text>
                    </VStack>
                    <VStack align="flex-end" gridColumn="span 2">
                        <Text fontWeight="semibold" fontSize="sm">
                            {typeof item.value === 'number' ? (
                                <FormatNumber
                                    value={item.value}
                                    style="currency"
                                    currency={currency.code}
                                />
                            ) : (
                                item.value
                            )}
                        </Text>
                    </VStack>
                </SimpleGrid>
            ))}
        </Stack>
    )
}
