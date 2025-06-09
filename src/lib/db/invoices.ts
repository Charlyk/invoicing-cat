import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, Invoice } from "./index";

const INVOICES_KEY = ["invoices"];

export function useInvoices() {
  const queryClient = useQueryClient();

  const allInvoicesQuery = useQuery({
    queryKey: INVOICES_KEY,
    queryFn: () => db.invoices.toArray(),
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoice: Invoice) => {
      const id = await db.invoices.add(invoice);
      return db.invoices.get(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICES_KEY });
    },
  });

  const deleteInvoiceMutation = useMutation({
    mutationFn: async (id: number) => {
      await db.invoices.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICES_KEY });
    },
  });

  const updateInvoiceStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: Invoice["status"] }) => {
      await db.invoices.update(id, { status });
      return db.invoices.get(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICES_KEY });
    },
  });

  const getInvoiceById = async (id: number): Promise<Invoice | undefined> => {
    return db.invoices.get(id);
  };

  const getLastInvoiceNumber = async (): Promise<string | undefined> => {
    const invoices = await db.invoices.toArray();
    if (invoices.length === 0) return undefined;

    const sorted = invoices
      .filter(inv => inv.invoiceNumber)
      .sort((a, b) =>
        Number(b.invoiceNumber.replace(/\D/g, "")) -
        Number(a.invoiceNumber.replace(/\D/g, ""))
      );

    return sorted[0]?.invoiceNumber;
  };

  return {
    allInvoices: allInvoicesQuery.data ?? [],
    isLoading: allInvoicesQuery.isLoading,
    error: allInvoicesQuery.error,
    refetch: allInvoicesQuery.refetch,

    createInvoice: createInvoiceMutation.mutateAsync,
    deleteInvoiceById: deleteInvoiceMutation.mutateAsync,
    updateInvoiceStatus: updateInvoiceStatusMutation.mutateAsync,

    getInvoiceById,
    getLastInvoiceNumber,
  };
}
