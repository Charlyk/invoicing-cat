'use client'

import {
  Button,
  Center,
  CollapsibleContent,
  CollapsibleRoot,
  Container,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import { Logo } from './logo'
import { CollapsibleTrigger } from './collapsible-trigger'
import { NavbarLinks } from './navbar-links'
import {ColorModeButton} from "@/components/ui/color-mode";
import {LuDownload} from "react-icons/lu";
import {useAppSelector} from "@/lib/hooks";
import {
  selectClientEmail,
  selectClientName, selectCurrency, selectDiscount,
  selectDueDate, selectInvoiceNumber, selectItems,
  selectSubject, selectTax
} from "@/lib/features/ivoicing/invoicingSlice";
import {downloadInvoicePdf} from "@/lib/dowloadInvoicePdf";
import {useState} from "react";

export const NavBar = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const invoiceNumber = useAppSelector(selectInvoiceNumber);
  const dueDate = useAppSelector(selectDueDate)
  const subject = useAppSelector(selectSubject)
  const clientName = useAppSelector(selectClientName)
  const clientEmail = useAppSelector(selectClientEmail)
  const products = useAppSelector(selectItems)
  const currency = useAppSelector(selectCurrency)
  const discount = useAppSelector(selectDiscount)
  const tax = useAppSelector(selectTax)

  const handleDownloadClick = async () => {
    setIsLoading(true)
    await downloadInvoicePdf({
      invoiceNumber: invoiceNumber,
      dueDate: dueDate,
      subject: subject,
      clientName: clientName,
      clientEmail: clientEmail,
      products: products,
      currency: currency,
      discount: discount.numeric,
      tax: tax
    })
    setIsLoading(false)
  }

  return (
    <Center position="sticky" zIndex="docked" top="6" left="4" right="4">
      <Container
        background="bg.panel"
        borderRadius="l3"
        boxShadow="xs"
        maxW={{ base: 'full', md: 'fit-content' }}
        px="4"
        py="3"
      >
        <CollapsibleRoot>
          <HStack gap={{ base: '3', md: '8' }}>
            <Logo />
            <Spacer hideFrom="md" />
            <NavbarLinks hideBelow="md" />
            <ColorModeButton/>
            <Button
              size={{ base: 'sm', md: 'md' }}
              loading={isLoading}
              onClick={handleDownloadClick}
            >
              <LuDownload />
              Download Invoice
            </Button>
            <CollapsibleTrigger />
          </HStack>
          <CollapsibleContent hideFrom="md">
            <NavbarLinks pt="5" pb="2" alignItems="center" />
          </CollapsibleContent>
        </CollapsibleRoot>
      </Container>
    </Center>
  )
}
