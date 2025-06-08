import {createAppSlice} from "@/lib/createAppSlice";
import type {PayloadAction} from "@reduxjs/toolkit";
import {ProductData} from "@/components/invoice-form/types";
import discounts, {DiscountOption} from "@/data/discounts";
import {DateTime} from "luxon";
import {v4 as uuidv4} from 'uuid';
import {Client} from "@/lib/db";

export interface InvoicingSliceState {
  logoFile?: string | null;
  invoiceNumber: string;
  senderName: string;
  senderEmail: string;
  client: Client | null;
  clientName: string;
  clientEmail: string;
  subject: string;
  dueDate: string;
  tax: number;
  discount: DiscountOption;
  notes: string;
  items: ProductData[];
}

function emptyProduct(): ProductData {
  return {
    title: '',
    quantity: 1,
    price: 0,
    id: uuidv4()
  }
}

const initialState: InvoicingSliceState = {
  logoFile: null,
  invoiceNumber: '',
  senderName: '',
  senderEmail: '',
  client: null,
  clientName: '',
  clientEmail: '',
  subject: '',
  dueDate: DateTime.now().plus({day: 10}).toFormat('yyyy-MM-dd'),
  tax: 0,
  discount: discounts[0],
  notes: '',
  items: [
    emptyProduct(),
  ]
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const invoicingSlice = createAppSlice({
  name: "invoicing",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    logoFile: create.reducer((state, action: PayloadAction<string | null | undefined>) => {
      state.logoFile = action.payload;
    }),
    invoiceNumber: create.reducer((state, action: PayloadAction<string>) => {
      state.invoiceNumber = action.payload
    }),
    senderName: create.reducer((state, action: PayloadAction<string>) => {
      state.senderName = action.payload
    }),
    senderEmail: create.reducer((state, action: PayloadAction<string>) => {
      state.senderEmail = action.payload
    }),
    setClient: create.reducer((state, action: PayloadAction<Client | null>) => {
      state.client = action.payload
    }),
    subject: create.reducer((state, action: PayloadAction<string>) => {
      state.subject = action.payload
    }),
    dueDate: create.reducer((state, action: PayloadAction<string>) => {
      state.dueDate = action.payload
    }),
    tax: create.reducer((state, action: PayloadAction<number>) => {
      state.tax = action.payload
    }),
    discount: create.reducer((state, action: PayloadAction<DiscountOption>) => {
      state.discount = action.payload
    }),
    notes: create.reducer((state, action: PayloadAction<string>) => {
      state.notes = action.payload
    }),
    addItem: create.reducer((state) => {
      state.items = [...state.items, emptyProduct()]
    }),
    updateItem: create.reducer((state, action: PayloadAction<ProductData>) => {
      state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item)
    }),
    removeItem: create.reducer((state, action: PayloadAction<ProductData>) => {
      const newItems = state.items.filter(item => item.id !== action.payload.id)
      if (newItems.length === 0) {
        state.items = [emptyProduct()]
      } else {
        state.items = newItems
      }
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectLogoFile: (invoice) => invoice.logoFile,
    selectInvoiceNumber: (invoice) => invoice.invoiceNumber,
    selectSenderName: (invoice) => invoice.senderName,
    selectSenderEmail: (invoice) => invoice.senderEmail,
    selectClient: (invoice) => invoice.client,
    selectSubject: (invoice) => invoice.subject,
    selectDueDate: (invoice) => invoice.dueDate,
    selectTax: (invoice) => invoice.tax,
    selectDiscount: (invoice) => invoice.discount,
    selectNotes: (invoice) => invoice.notes,
    selectItems: (invoice) => invoice.items,
  },
});

// Action creators are generated for each case reducer function.
export const {
  logoFile,
  invoiceNumber,
  senderName,
  senderEmail,
  setClient,
  subject,
  dueDate,
  tax,
  discount,
  notes,
  addItem,
  updateItem,
  removeItem
} =
  invoicingSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectLogoFile,
  selectInvoiceNumber,
  selectSenderName,
  selectSenderEmail,
  selectClient,
  selectSubject,
  selectDueDate,
  selectTax,
  selectDiscount,
  selectNotes,
  selectItems
} = invoicingSlice.selectors;
