'use client'

import {Badge, Button, HStack, Menu, Portal, Table} from "@chakra-ui/react";
import {useTranslations} from "next-intl";
import {LuChevronDown, LuDownload, LuTrash} from "react-icons/lu";
import {Invoice, InvoiceStatus} from "@/lib/db";
import {useState} from "react";
import {ConfirmationDialog} from "@/components/ui/confirmation-dialog";
import {useInvoices} from "@/lib/db/invoices";
import formatCurrencyWithClient from "@/lib/formatCurrencyWithClient";
import {useDownloadInvoiceFromHistory} from "@/lib/use-invoice-download";
import {DateTime} from "luxon";
import {useLocale} from "use-intl";

export const InvoicesTable = () => {
  const t = useTranslations("InvoicesTable")
  const locale = useLocale()
  const {allInvoices, deleteInvoiceById, updateInvoiceStatus} = useInvoices()
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null)
  const {downloadById, isLoading: isDownloading} = useDownloadInvoiceFromHistory()

  const onDeleteInvoice = async (id?: number) => {
    if (id) await deleteInvoiceById(id)
    setInvoiceToDelete(null)
  }

  const onDownload = async (id?: number) => {
    if (id) await downloadById(id)
  }

  const invoiceTotal = (invoice: Invoice): string => {
    const total = invoice.items.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
    const client = invoice.client
    return formatCurrencyWithClient(total, client)
  }

  const colorPaletteForStatus = (status: InvoiceStatus) => {
    switch (status) {
      case "unknown": return "gray";
      case "overdue": return "red";
      case "sent": return "yellow";
      case "paid": return "green";
    }
  }

  const statusForInvoice = (invoice: Invoice): InvoiceStatus => {
    const dueDate = new Date(invoice.dueDate);
    const now = new Date();

    if (invoice.status === 'sent' && dueDate < now) {
      return 'overdue';
    }

    return invoice.status ?? 'unknown';
  };

  return (
    <>
      <ConfirmationDialog
        open={invoiceToDelete != null}
        title={t('deleteTitle')}
        message={t('deleteMessage')}
        onCancel={() => setInvoiceToDelete(null)}
        onConfirm={() => {
          onDeleteInvoice(invoiceToDelete?.id)
        }}
      />
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t('client')}</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow="md">{t('date')}</Table.ColumnHeader>
            <Table.ColumnHeader>{t('status')}</Table.ColumnHeader>
            <Table.ColumnHeader hideBelow="md">{t('total')}</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">{t('actions')}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allInvoices.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>{invoice.client.name}</Table.Cell>
              <Table.Cell hideBelow="md">
                {DateTime.fromISO(invoice.createdAt).toLocaleString(DateTime.DATETIME_MED, {locale})}
              </Table.Cell>
              <Table.Cell>
                <Menu.Root onSelect={(selection) => {
                  const invoiceId = invoice.id
                  if (invoiceId) {
                    updateInvoiceStatus({ id: invoiceId, status: (selection.value as InvoiceStatus) ?? 'unknown'})
                  }
                }}>
                  <Menu.Trigger asChild>
                    <Badge cursor="pointer" colorPalette={colorPaletteForStatus(statusForInvoice(invoice))}>
                      {t(statusForInvoice(invoice))} <LuChevronDown/>
                    </Badge>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        {['unknown', 'sent', 'paid'].map((item) => (
                          <Menu.Item key={item} value={item}>{t(item)}</Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Table.Cell>
              <Table.Cell hideBelow="md">{invoiceTotal(invoice)}</Table.Cell>
              <Table.Cell textAlign="right">
                <HStack gap={2} justify="flex-end">
                  <Button
                    variant="plain"
                    size="sm"
                    loading={isDownloading}
                    onClick={() => onDownload(invoice.id)}
                  >
                    <LuDownload/>
                  </Button>
                  <Button
                    variant="plain"
                    colorPalette="red"
                    size="sm"
                    onClick={() => {
                      setInvoiceToDelete(invoice)
                    }}
                  >
                    <LuTrash/>
                  </Button>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
