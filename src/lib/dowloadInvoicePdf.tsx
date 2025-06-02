import {pdf} from '@react-pdf/renderer'
import {saveAs} from 'file-saver'
import {InvoiceDocument} from '@/components/preview/InvoiceDocument'
import currencies, {Currency} from "@/data/currencies";
import {ProductData} from "@/components/preview/InvoiceDocument"; // adjust path if needed

export async function downloadInvoicePdf({
                                           invoiceNumber,
                                           dueDate,
                                           subject,
                                           clientName,
                                           clientEmail,
                                           products,
                                           currency = currencies[0],
                                           discount = 0,
                                           tax = 0,
                                         }: {
  invoiceNumber: string
  dueDate: string
  subject: string
  clientName: string
  clientEmail: string
  products: ProductData[]
  currency?: Currency
  discount?: number // 0–1 float
  tax?: number // percent (e.g., 15)
}) {
  const blob = await pdf(
    <InvoiceDocument
      invoiceNumber={invoiceNumber}
      dueDate={dueDate}
      subject={subject}
      clientName={clientName}
      clientEmail={clientEmail}
      products={products}
      tax={tax}
      currency={currency}
      discount={discount}
    />
  ).toBlob()
  saveAs(blob, `Invoice-${invoiceNumber}.pdf`)
}
