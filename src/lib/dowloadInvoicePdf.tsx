import {pdf} from '@react-pdf/renderer'
import {saveAs} from 'file-saver'
import {InvoiceDocument} from '@/components/pdf/InvoiceDocument'
import currencies, {Currency} from "@/data/currencies";
import {ProductData} from "@/components/pdf/InvoiceDocument"; // adjust path if needed

export async function downloadInvoicePdf({
                                             invoiceNumber,
                                             dueDate,
                                             subject,
                                             senderName, senderEmail,
                                             clientName,
                                             clientEmail,
                                             products,
                                             currency = currencies[0],
                                             discount = 0,
                                             tax = 0,
    notes = ''
                                         }: {
    invoiceNumber: string
    dueDate: string
    subject: string
    senderName: string
    senderEmail: string
    clientName: string
    clientEmail: string
    products: ProductData[]
    currency?: Currency
    discount?: number // 0–1 float
    tax?: number // percent (e.g., 15)
    notes?: string
}) {
    const blob = await pdf(
        <InvoiceDocument
            invoiceNumber={invoiceNumber}
            dueDate={dueDate}
            subject={subject}
            senderName={senderName}
            senderEmail={senderEmail}
            clientName={clientName}
            clientEmail={clientEmail}
            products={products}
            tax={tax}
            currency={currency}
            discount={discount}
            notes={notes}
        />
    ).toBlob()
    saveAs(blob, `Invoice-${invoiceNumber}.pdf`)
}
