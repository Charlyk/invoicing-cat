'use client'

import {Box, Flex, For, FormatNumber, SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import {InvoicePage} from "@/components/preview/invoice-page";
import {useAppSelector} from "@/lib/hooks";
import {
  selectClientEmail,
  selectClientName, selectCurrency, selectDiscount,
  selectDueDate, selectInvoiceNumber, selectItems,
  selectSubject, selectTax,
} from "@/lib/features/ivoicing/invoicingSlice";
import {ProductData} from "@/components/invoice-form/types";

export const Invoice = () => {

  return (
    <Box width="100%">
      <InvoicePage>
        <VStack gap={8}>
          <InvoiceHeader/>
          <InvoiceProducts/>
          <InvoiceTotals/>
        </VStack>
      </InvoicePage>
    </Box>
  )
}

const InvoiceHeader = () => {
  const invoiceNumber = useAppSelector(selectInvoiceNumber);
  const dueDate = useAppSelector(selectDueDate)
  const subject = useAppSelector(selectSubject)
  const clientName = useAppSelector(selectClientName)
  const clientEmail = useAppSelector(selectClientEmail)

  return (
    <VStack gap={8} width="full" overflow="hidden">
      <Stack flex="1" align="end" width="full">
        <Text fontSize="sm" color="fg.muted">Invoice {invoiceNumber}</Text>
      </Stack>

      <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">Due date</Text>
          <Text fontSize="md" fontWeight="semibold">{dueDate}</Text>
        </VStack>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">Subject</Text>
          <Text fontSize="md" fontWeight="semibold">{subject ? subject : '---'}</Text>
        </VStack>
      </SimpleGrid>
      <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">Billed to</Text>
          <Text fontSize="md" fontWeight="semibold">{clientName ? clientName : '---'}</Text>
          {clientEmail ? (
            <Text fontSize="md" fontWeight="semibold">{clientEmail}</Text>
          ) : null}
        </VStack>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">Subject</Text>
          <Text fontSize="md" fontWeight="semibold">{subject ? subject : '---'}</Text>
        </VStack>
      </SimpleGrid>
    </VStack>
  )
}

const InvoiceProducts = () => {
  const products = useAppSelector(selectItems)
  return (
    <Box overflow="hidden" width="full">
      <SimpleGrid px="4" background="bg.muted" py="2" width="full" columns={{base: 6, md: 14}} gap="2">
        <For
          each={[
            {title: 'Item', gridColumn: 'span 8'},
            {title: 'Qty', gridColumn: 'span 2'},
            {title: 'Price', gridColumn: 'span 2'},
            {title: 'Total', gridColumn: 'span 2', align: 'flex-end'},
          ]}
        >
          {(item) => (
            <Stack
              key={item.title}
              color="fg.muted"
              textStyle="sm"
              gridColumn={item.gridColumn}
              align={item.align}
            >
              {item.title}
            </Stack>
          )}
        </For>
      </SimpleGrid>
      <Stack>
        {products.map((item) => (
          <InvoiceProduct key={item.id} data={item}/>
        ))}
      </Stack>
    </Box>
  )
}

const InvoiceProduct = ({data}: { data: ProductData }) => {
  const currency = useAppSelector(selectCurrency);
  return (
    <SimpleGrid px="4" py="2" columns={{base: 6, md: 14}} gap="2">
      <Flex gridColumn="span 8" gap="4" alignContent="center">
        <Text fontSize="sm">
          {data.title}
        </Text>
      </Flex>

      <Box gridColumn="span 2" hideBelow="md" alignContent="center">
        <Text fontSize="sm">
          {data.quantity}
        </Text>
      </Box>

      <Box gridColumn="span 2" hideBelow="md" alignContent="center">
        <Text fontSize="sm">
          <FormatNumber
            value={data.price}
            style="currency"
            currency={currency.code}
          />
        </Text>
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
    </SimpleGrid>
  )
}

const InvoiceTotals = () => {
  const products = useAppSelector(selectItems)
  const currency = useAppSelector(selectCurrency);
  const discount = useAppSelector(selectDiscount);
  const tax = useAppSelector(selectTax);

  const subtotal = products
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  const discountAmount = Math.min(discount.numeric * subtotal, subtotal);
  const taxableBase = Math.max(subtotal - discountAmount, 0);
  const taxAmount = Math.max((tax / 100) * taxableBase, 0);
  const total = Math.max(taxableBase + taxAmount, 0);

  const totals: { title: string; value: string | number }[] = [
    {title: 'Subtotal', value: subtotal},
    ...(discountAmount > 0
      ? [{title: `Discount ${discount.value}`, value: discountAmount}]
      : []),
    ...(taxAmount > 0
      ? [{title: `Tax ${tax}%`, value: taxAmount}]
      : []),
    {title: 'Total', value: total},
    {title: 'Amount due', value: total},
  ];

  return (
    <Stack width="full">
      {totals.map((item) => (
        <SimpleGrid key={item.title} px="4" columns={{base: 6, md: 14}} gap="1">
          <VStack align="flex-end" gridColumn="span 12" gap="8">
            <Text fontWeight="semibold" fontSize="sm">
              {item.title}
            </Text>
          </VStack>
          <VStack align="flex-end" gridColumn="span 2" gap="8">
            <Text fontWeight="semibold" fontSize="sm">
              {typeof item.value === "number" ? (
                <FormatNumber
                  value={item.value}
                  style="currency"
                  currency={currency.code}
                />
              ) : item.value}
            </Text>
          </VStack>
        </SimpleGrid>
      ))}
    </Stack>
  )
}
