'use client'

import {
  Button,
  Center, CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack, Link,
  Spacer,
} from '@chakra-ui/react'
import {Logo} from './logo'
import {ColorModeButton} from "@/components/ui/color-mode";
import {LuDownload} from "react-icons/lu";
import {useAppSelector} from "@/lib/hooks";
import {
  selectClient, selectCurrency, selectDiscount,
  selectDueDate, selectInvoiceNumber, selectItems, selectLogoFile, selectNotes, selectSenderEmail, selectSenderName,
  selectSubject, selectTax
} from "@/lib/features/ivoicing/invoicingSlice";
import {downloadInvoicePdf} from "@/lib/dowloadInvoicePdf";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {InvoiceStrings} from "@/components/pdf/InvoiceDocument";
import {NavbarLinks} from "@/components/nav-bar/navbar-links";
import {CollapsibleTrigger} from "@/components/nav-bar/collapsible-trigger";
import {toaster} from "@/components/ui/toaster";

export const NavBar = () => {
  const t = useTranslations('NavBar')
  const invoiceDetailsT = useTranslations('InvoiceDetails')
  const productsT = useTranslations('Products')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const invoiceNumber = useAppSelector(selectInvoiceNumber);
  const dueDate = useAppSelector(selectDueDate)
  const subject = useAppSelector(selectSubject)
  const senderName = useAppSelector(selectSenderName)
  const senderEmail = useAppSelector(selectSenderEmail)
  const client = useAppSelector(selectClient)
  const products = useAppSelector(selectItems)
  const currency = useAppSelector(selectCurrency)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)
  const notes = useAppSelector(selectNotes)
  const logo = useAppSelector(selectLogoFile)

  const handleDownloadClick = async () => {
    setIsLoading(true)
    if (!client) {
      return toaster.error({
        description: t('clientNullMessage')
      })
    }
    const strings: InvoiceStrings = {
      details: {
        subject: invoiceDetailsT('subject'),
        dueDate: invoiceDetailsT('dueDate'),
        invoiceNumberTitle: invoiceDetailsT('invoice', {invoiceNumber}),
        createdBy: invoiceDetailsT('createdBy'),
        billedTo: invoiceDetailsT('billedTo'),
      },
      products: {
        items: productsT('items'),
        price: productsT('price'),
        quantity: productsT('quantity'),
        total: productsT('total'),
        subtotal: productsT('subtotal'),
        discountTitle: productsT('discount', {value: discount.value}),
        taxTitle: productsT('tax', {value: tax}),
        notesTitle: productsT('notes'),
      }
    }

    await downloadInvoicePdf({
      strings: strings,
      logo: logo,
      invoiceNumber: invoiceNumber,
      dueDate: dueDate,
      subject: subject,
      senderName: senderName,
      senderEmail: senderEmail,
      client: client,
      products: products,
      currency: currency,
      discount: discount,
      tax: tax,
      notes: notes,
    })
    setIsLoading(false)
  }

  return (
    <Center position="sticky" zIndex="docked" top="6" left="4" right="4">
      <Container
        background="bg.panel"
        borderRadius="l3"
        boxShadow="xs"
        maxW={{base: 'full', md: 'fit-content'}}
        px="4"
        mx={{base: '4', md: 'auto'}}
        py="3"
      >
        <CollapsibleRoot>
          <HStack gap={{base: '3', md: '8'}}>
            <Link href="/">
              <Logo/>
            </Link>
            <Spacer hideFrom="md"/>
            <NavbarLinks hideBelow="md"/>
            <ColorModeButton/>
            <Button
              size={{base: 'sm', md: 'md'}}
              loading={isLoading}
              onClick={handleDownloadClick}
            >
              <LuDownload/>
              {t('downloadInvoice')}
            </Button>
            <CollapsibleTrigger/>
          </HStack>
          <CollapsibleContent hideFrom="md">
            <NavbarLinks pt="5" pb="2" alignItems="center"/>
          </CollapsibleContent>
        </CollapsibleRoot>
      </Container>
    </Center>
  )
}
