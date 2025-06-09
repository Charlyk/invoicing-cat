'use client'

import {pdf} from '@react-pdf/renderer'
import {saveAs} from 'file-saver'
import {InvoiceDocument, InvoiceStrings} from '@/components/pdf/InvoiceDocument'
import {ProductData} from "@/components/pdf/InvoiceDocument";
import {toaster} from "@/components/ui/toaster";
import {Client} from "@/lib/db";

export async function downloadInvoicePdf({
                                             strings,
                                             logo,
                                             invoiceNumber,
                                             dueDate,
                                             subject,
                                             senderName, senderEmail,
                                             client,
                                             products,
                                             discount = 0,
                                             tax = 0,
                                             notes = ''
                                         }: {
    strings: InvoiceStrings
    logo?: string | null
    invoiceNumber: string
    dueDate: string
    subject: string
    senderName: string
    senderEmail: string
    client: Client,
    products: ProductData[]
    discount?: number
    tax?: number // percent (e.g., 15)
    notes?: string
}) {
    try {
        const blob = await pdf(
            <InvoiceDocument
                strings={strings}
                logo={logo}
                dueDate={dueDate}
                subject={subject}
                senderName={senderName}
                senderEmail={senderEmail}
                client={client}
                products={products}
                tax={tax}
                discount={discount}
                notes={notes}
            />
        ).toBlob()
        saveAs(blob, `Invoice-${invoiceNumber}.pdf`)
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        toaster.error({
            description: message,
        })
    }
}
