import { useState } from "react";
import { useTranslations } from "next-intl";
import { downloadInvoicePdf } from "@/lib/dowloadInvoicePdf";
import { useAppSelector } from "@/lib/hooks";
import {
  selectClient,
  selectDiscount,
  selectDueDate,
  selectInvoiceNumber,
  selectItems,
  selectLogoFile,
  selectNotes,
  selectSenderEmail,
  selectSenderName,
  selectSubject,
  selectTax,
} from "@/lib/features/ivoicing/invoicingSlice";
import { InvoiceStrings } from "@/components/pdf/InvoiceDocument";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { toaster } from "@/components/ui/toaster";
import {useInvoices} from "@/lib/db/invoices";
import {getClientTranslation} from "@/i18n/getClientTranslation"; // Assuming db.invoices exists

export function useDownloadAndStoreInvoice() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("NavBar");
  const {createInvoice} = useInvoices()

  const invoiceNumber = useAppSelector(selectInvoiceNumber);
  const dueDate = useAppSelector(selectDueDate);
  const subject = useAppSelector(selectSubject);
  const senderName = useAppSelector(selectSenderName);
  const senderEmail = useAppSelector(selectSenderEmail);
  const client = useAppSelector(selectClient);
  const products = useAppSelector(selectItems);
  const discount = useAppSelector(selectDiscount);
  const tax = useAppSelector(selectTax);
  const notes = useAppSelector(selectNotes);
  const logo = useAppSelector(selectLogoFile);
  const documentT = useClientTranslation(client?.locale);

  const downloadAndStore = async () => {
    if (!client) {
      return toaster.error({ description: t("clientNullMessage") });
    }

    setIsLoading(true);

    const strings: InvoiceStrings = {
      details: {
        subject: documentT("subject"),
        dueDate: documentT("dueDate"),
        invoiceNumberTitle: documentT("invoice", { invoiceNumber }),
        createdBy: documentT("createdBy"),
        billedTo: documentT("billedTo"),
        subtotal: documentT("subtotal"),
        discountTitle: documentT("discount", { value: discount.value }),
        taxTitle: documentT("tax", { value: tax }),
        notesTitle: documentT("notes"),
        grandTotal: documentT("grandTotal"),
      },
      products: {
        items: documentT("items"),
        price: documentT("price"),
        quantity: documentT("quantity"),
        total: documentT("total"),
      },
    };

    // Download PDF
    await downloadInvoicePdf({
      strings,
      logo,
      invoiceNumber,
      dueDate,
      subject,
      senderName,
      senderEmail,
      client,
      products,
      discount,
      tax,
      notes,
    });

    await createInvoice({
      createdAt: new Date().toISOString(),
      invoiceNumber,
      dueDate,
      subject,
      sender: {
        name: senderName,
        email: senderEmail,
        logo,
      },
      client,
      items: products,
      discount,
      tax,
      notes,
      currency: client?.currency || "USD",
      status: "unknown",
    })

    setIsLoading(false);
  };

  return { downloadAndStore, isLoading };
}

export function useDownloadInvoiceFromHistory() {
  const [isLoading, setIsLoading] = useState(false);
  const { getInvoiceById } = useInvoices();

  const downloadById = async (invoiceId: number) => {
    setIsLoading(true);
    const invoice = await getInvoiceById(invoiceId);

    if (!invoice) {
      toaster.error({ description: "Invoice not found." });
      setIsLoading(false);
      return;
    }

    const documentT = await getClientTranslation(invoice.client?.locale);

    const strings: InvoiceStrings = {
      details: {
        subject: documentT("subject"),
        dueDate: documentT("dueDate"),
        invoiceNumberTitle: documentT("invoice", { invoiceNumber: invoice.invoiceNumber }),
        createdBy: documentT("createdBy"),
        billedTo: documentT("billedTo"),
        subtotal: documentT("subtotal"),
        discountTitle: documentT("discount", { value: invoice.discount?.value ?? '' }),
        taxTitle: documentT("tax", { value: invoice.tax ?? '' }),
        notesTitle: documentT("notes"),
        grandTotal: documentT("grandTotal"),
      },
      products: {
        items: documentT("items"),
        price: documentT("price"),
        quantity: documentT("quantity"),
        total: documentT("total"),
      },
    };

    await downloadInvoicePdf({
      strings,
      logo: invoice.sender.logo,
      invoiceNumber: invoice.invoiceNumber,
      dueDate: invoice.dueDate,
      subject: invoice.subject ?? '---',
      senderName: invoice.sender.name,
      senderEmail: invoice.sender.email ?? '',
      client: invoice.client,
      products: invoice.items,
      discount: invoice.discount,
      tax: invoice.tax,
      notes: invoice.notes,
    });

    setIsLoading(false);
  };

  return { downloadById, isLoading };
}
