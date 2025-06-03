'use client'

import {
  Box,
  HStack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import {useAppSelector} from '@/lib/hooks'
import {
  selectDiscount,
  selectItems, selectNotes,
  selectTax,
} from '@/lib/features/ivoicing/invoicingSlice'
import {InvoicePage, MobileInvoicePage} from "@/components/preview/invoice-page";
import {InvoiceTotals} from "@/components/preview/invoice-totals";
import {InvoiceProducts} from "@/components/preview/invoice-products";
import {InvoiceHeader} from "@/components/preview/invoice-header";
import {useTranslation} from "@/lib/localization";

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
  const {t} = useTranslation()
  const [isMdUp] = useMediaQuery(['(min-width: 48em)'])
  const products = useAppSelector(selectItems)
  const notes = useAppSelector(selectNotes)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)

  const productPages = paginateInvoiceItems({
    items: products,
    discount: discount.numeric,
    tax,
  })

  console.log(productPages)

  return (
    <Box width="100%">
      {productPages.map((pageItems, index) => (
          !isMdUp ? (
                <MobileInvoicePage key={index}>
                  <VStack gap={8}>
                    {index === 0 && <InvoiceHeader />}
                    {pageItems.length > 0 && <InvoiceProducts items={pageItems} />}
                    {index === productPages.length - 1 && <InvoiceTotals />}
                    {index === productPages.length - 1 && notes && (
                        <HStack width="full">
                          <Text fontWeight="semibold">{t.products.notes}:</Text>
                          <Text>{notes}</Text>
                        </HStack>
                    )}
                  </VStack>
                </MobileInvoicePage>
            ) : (
                <InvoicePage key={index}>
                  <VStack gap={8}>
                    {index === 0 && <InvoiceHeader />}
                    {pageItems.length > 0 && <InvoiceProducts items={pageItems} />}
                    {index === productPages.length - 1 && <InvoiceTotals />}
                    {index === productPages.length - 1 && notes && (
                        <HStack width="full">
                          <Text fontWeight="semibold">{t.products.notes}:</Text>
                          <Text>{notes}</Text>
                        </HStack>
                    )}
                  </VStack>
                </InvoicePage>
            )
      ))}
    </Box>
  )
}
