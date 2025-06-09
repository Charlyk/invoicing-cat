import {useAppSelector} from "@/lib/hooks";
import {
  selectClient,
  selectDiscount,
  selectItems,
  selectTax
} from "@/lib/features/ivoicing/invoicingSlice";
import {SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {useClientTranslation} from "@/i18n/useClientTranslation";
import formatCurrencyWithClient from "@/lib/formatCurrencyWithClient";

export const InvoiceTotals = ({locale}: { locale: string }) => {
  const t = useClientTranslation(locale)
  const products = useAppSelector(selectItems)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)
  const client = useAppSelector(selectClient)

  const subtotal = products
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0)
  const discountAmount = Math.min((discount / 100) * subtotal, subtotal)
  const taxableBase = Math.max(subtotal - discountAmount, 0)
  const taxAmount = Math.max((tax / 100) * taxableBase, 0)
  const total = Math.max(taxableBase + taxAmount, 0)

  const totals: { id: string; title: string; value: string | number }[] = [
    {id: 'subtotal', title: t('subtotal'), value: formatCurrencyWithClient(subtotal, client)},
    ...(discountAmount > 0
      ? [{
        id: 'discount',
        title: t('discount', {value: discount}),
        value: formatCurrencyWithClient(-discountAmount, client)
      }]
      : []),
    ...(taxAmount > 0
      ? [{id: 'tax', title: t('tax', {value: tax}), value: formatCurrencyWithClient(taxAmount, client)}]
      : []),
    {id: 'grandTotal', title: t('grandTotal'), value: formatCurrencyWithClient(total, client)}
  ]

  return (
    <Stack width="full">
      {totals.map((item) => (
        <SimpleGrid
          key={item.id}
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
                formatCurrencyWithClient(item.value, client)
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
