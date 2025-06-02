'use client'

import {
  Box,
  Flex,
  For,
  FormatNumber,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
// import { InvoicePage } from '@/components/preview/invoice-page'
import {useAppSelector} from '@/lib/hooks'
import {
  selectClientEmail,
  selectClientName,
  selectCurrency,
  selectDiscount,
  selectDueDate,
  selectInvoiceNumber,
  selectItems,
  selectSubject,
  selectTax,
} from '@/lib/features/ivoicing/invoicingSlice'
import {ProductData} from '@/components/invoice-form/types'
import {useEffect, useRef, useState} from "react";
import {DateTime} from 'luxon';

// 🧠 Pagination utility
function paginateInvoiceItems<T>({
                                   items,
                                   discount,
                                   tax,
                                   headerItemsLimit = 14,
                                   fullPageItems = 20,
                                   footerSize = 5, // Number of rows footer occupies
                                   footerPushBack = 5, // Rows we gain when footer is moved to its own page
                                 }: {
  items: T[];
  discount: number;
  tax: number;
  headerItemsLimit?: number;
  fullPageItems?: number;
  footerSize?: number;
  footerPushBack?: number;
}): T[][] {
  const pages: T[][] = [];
  const hasFooter = discount > 0 || tax > 0;

  let i = 0;

  // Step 1: First page
  let firstPageLimit = headerItemsLimit;
  const remainingItems = items.length - firstPageLimit;

  // Check if we need a full separate footer page
  const canFitFooterWithLastItems = remainingItems <= (fullPageItems - footerSize);

  if (!canFitFooterWithLastItems && hasFooter) {
    // Move footer to its own page, free up space on previous page
    firstPageLimit += footerPushBack;
  }

  pages.push(items.slice(i, i + firstPageLimit));
  i += firstPageLimit;

  // Step 2: Full middle pages
  while (i < items.length) {
    const remaining = items.length - i;

    // If remaining + footer won't fit, push to next page and create a footer-only page
    if (remaining <= fullPageItems - footerSize) {
      pages.push(items.slice(i));
      i = items.length;
    } else {
      pages.push(items.slice(i, i + fullPageItems));
      i += fullPageItems;
    }
  }

  // Step 3: If footer didn’t fit on last page, add an empty page just for totals
  const lastPageHasFooterRoom = pages[pages.length - 1].length <= (fullPageItems - footerSize);
  if (!lastPageHasFooterRoom && hasFooter) {
    pages.push([]); // footer-only page
  }

  return pages;
}

export const Invoice = () => {
  const products = useAppSelector(selectItems)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)

  const productPages = paginateInvoiceItems({
    items: products,
    discount: discount.numeric,
    tax,
  })

  return (
    <Box width="100%">
      {productPages.map((pageItems, index) => (
        <InvoicePage key={index}>
          <VStack gap={8}>
            {index === 0 && <InvoiceHeader />}
            {pageItems.length > 0 && <InvoiceProducts items={pageItems} />}
            {index === productPages.length - 1 && <InvoiceTotals />}
          </VStack>
        </InvoicePage>
      ))}
    </Box>
  )
}

const InvoiceHeader = () => {
  const invoiceNumber = useAppSelector(selectInvoiceNumber)
  const dueDate = useAppSelector(selectDueDate)
  const subject = useAppSelector(selectSubject)
  const clientName = useAppSelector(selectClientName)
  const clientEmail = useAppSelector(selectClientEmail)

  return (
    <VStack gap={8} width="full" overflow="hidden">
      <Stack flex="1" align="end" width="full">
        <Text fontSize="sm" color="fg.muted">
          Invoice {invoiceNumber}
        </Text>
      </Stack>

      <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">
            Due date
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            {DateTime.fromSQL(dueDate).toLocaleString(DateTime.DATE_MED)}
          </Text>
        </VStack>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">
            Subject
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            {subject || '---'}
          </Text>
        </VStack>
      </SimpleGrid>

      <SimpleGrid flex="1" width="full" columns={{base: 4, md: 4}}>
        <VStack align="start" gap="1" gridColumn="span 2">
          <Text fontSize="sm" color="fg.muted">
            Billed to
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            {clientName || '---'}
          </Text>
          {clientEmail && (
            <Text fontSize="md" fontWeight="semibold">
              {clientEmail}
            </Text>
          )}
        </VStack>
      </SimpleGrid>
    </VStack>
  )
}

const InvoiceProducts = ({items}: { items: ProductData[] }) => {
  return (
    <Box overflow="hidden" width="full">
      <SimpleGrid
        px="4"
        background="bg.muted"
        py="2"
        width="full"
        columns={{base: 6, md: 14}}
        gap="2"
      >
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
        {items.map((item) => (
          <InvoiceProduct key={item.id} data={item}/>
        ))}
      </Stack>
    </Box>
  )
}

const InvoiceProduct = ({data}: { data: ProductData }) => {
  const currency = useAppSelector(selectCurrency)
  return (
    <SimpleGrid px="4" py="2" columns={{base: 6, md: 14}} gap="2">
      <Flex gridColumn="span 8" gap="4" alignContent="center">
        <Text fontSize="sm">{data.title}</Text>
      </Flex>

      <Box gridColumn="span 2" hideBelow="md" alignContent="center">
        <Text fontSize="sm">{data.quantity}</Text>
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
    {title: 'Subtotal', value: subtotal},
    ...(discountAmount > 0
      ? [{title: `Discount ${discount.value}`, value: discountAmount}]
      : []),
    ...(taxAmount > 0
      ? [{title: `Tax ${tax}%`, value: taxAmount}]
      : []),
    {title: 'Total', value: total}
  ]

  return (
    <Stack width="full">
      {totals.map((item) => (
        <SimpleGrid
          key={item.title}
          px="4"
          columns={{base: 6, md: 14}}
          gap="1"
        >
          <VStack align="flex-end" gridColumn="span 12" gap="8">
            <Text fontWeight="semibold" fontSize="sm">
              {item.title}
            </Text>
          </VStack>
          <VStack align="flex-end" gridColumn="span 2" gap="8">
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

// ✅ Page wrapper (no changes)
export const InvoicePage = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const PAGE_WIDTH = 794
  const PAGE_HEIGHT = 1123

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return

      const container = containerRef.current.getBoundingClientRect()
      const scaleX = container.width / PAGE_WIDTH
      const scaleY = container.height / PAGE_HEIGHT

      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <Box
      ref={containerRef}
      w="100%"
      maxW="1000px"
      mx="auto"
      position="relative"
      _before={{
        content: `""`,
        display: 'block',
        paddingTop: '141.4%', // A4 aspect ratio
      }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width={`${PAGE_WIDTH}px`}
        height={`${PAGE_HEIGHT}px`}
        transform={`scale(${scale})`}
        transformOrigin="top left"
        bg="bg.panel"
        boxShadow="lg"
        p={8}
        overflow="hidden"
        mb={6}
        className="invoice-page"
      >
        {children}
      </Box>
    </Box>
  )
}
