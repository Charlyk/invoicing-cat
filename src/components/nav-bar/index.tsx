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
  selectClient, selectDiscount,
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
import {useClientTranslation} from "@/i18n/useClientTranslation";

export const NavBar = () => {
  const t = useTranslations('NavBar')
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const invoiceNumber = useAppSelector(selectInvoiceNumber);
  const dueDate = useAppSelector(selectDueDate)
  const subject = useAppSelector(selectSubject)
  const senderName = useAppSelector(selectSenderName)
  const senderEmail = useAppSelector(selectSenderEmail)
  const client = useAppSelector(selectClient)
  const products = useAppSelector(selectItems)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)
  const notes = useAppSelector(selectNotes)
  const logo = useAppSelector(selectLogoFile)
  const documentT = useClientTranslation(client?.locale)

  const handleDownloadClick = async () => {
    if (!client) {
      return toaster.error({
        description: t('clientNullMessage')
      })
    }

    setIsLoading(true)

    const strings: InvoiceStrings = {
      details: {
        subject: documentT('subject'),
        dueDate: documentT('dueDate'),
        invoiceNumberTitle: documentT('invoice', {invoiceNumber}),
        createdBy: documentT('createdBy'),
        billedTo: documentT('billedTo'),
        subtotal: documentT('subtotal'),
        discountTitle: documentT('discount', {value: discount.value}),
        taxTitle: documentT('tax', {value: tax}),
        notesTitle: documentT('notes'),
        grandTotal: documentT('grandTotal'),
      },
      products: {
        items: documentT('items'),
        price: documentT('price'),
        quantity: documentT('quantity'),
        total: documentT('total'),
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
