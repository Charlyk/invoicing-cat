'use client'

import {
    Button,
    Center,
    CollapsibleRoot,
    Container,
    HStack,
    Spacer,
} from '@chakra-ui/react'
import {Logo} from './logo'
import {ColorModeButton} from "@/components/ui/color-mode";
import {LuDownload} from "react-icons/lu";
import {useAppSelector} from "@/lib/hooks";
import {
    selectClientEmail,
    selectClientName, selectCurrency, selectDiscount,
    selectDueDate, selectInvoiceNumber, selectItems, selectLogoFile, selectNotes, selectSenderEmail, selectSenderName,
    selectSubject, selectTax
} from "@/lib/features/ivoicing/invoicingSlice";
import {downloadInvoicePdf} from "@/lib/dowloadInvoicePdf";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {InvoiceStrings} from "@/components/pdf/InvoiceDocument";

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
    const clientName = useAppSelector(selectClientName)
    const clientEmail = useAppSelector(selectClientEmail)
    const products = useAppSelector(selectItems)
    const currency = useAppSelector(selectCurrency)
    const discount = useAppSelector(selectDiscount)
    const tax = useAppSelector(selectTax)
    const notes = useAppSelector(selectNotes)
    const logo = useAppSelector(selectLogoFile)

    const handleDownloadClick = async () => {
        setIsLoading(true)
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
            clientName: clientName,
            clientEmail: clientEmail,
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
                        <Logo/>
                        <Spacer hideFrom="md"/>
                        <ColorModeButton/>
                        <Button
                            size={{base: 'sm', md: 'md'}}
                            loading={isLoading}
                            onClick={handleDownloadClick}
                        >
                            <LuDownload/>
                            {t('downloadInvoice')}
                        </Button>
                    </HStack>
                </CollapsibleRoot>
            </Container>
        </Center>
    )
}
