import {createAppSlice} from "@/lib/createAppSlice";
import type {PayloadAction} from "@reduxjs/toolkit";
import currencies, {Currency} from "@/data/currencies";
import {ProductData} from "@/components/invoice-form/types";
import discounts, {DiscountOption} from "@/data/discounts";
import {DateTime} from "luxon";
import {v4 as uuidv4} from 'uuid';

export interface InvoicingSliceState {
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    subject: string;
    dueDate: string;
    currency: Currency;
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

function defaultInvoiceNumber(count: number): string {
    const dateTime = DateTime.now().plus({day: 10}).toFormat('MM.yyyy')
    return `#${count}-${dateTime}`
}

const initialState: InvoicingSliceState = {
    invoiceNumber: defaultInvoiceNumber(1),
    clientName: '',
    clientEmail: '',
    subject: '',
    dueDate: DateTime.now().plus({day: 10}).toFormat('yyyy-MM-dd'),
    currency: currencies[0],
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
        invoiceNumber: create.reducer((state, action: PayloadAction<string>) => {
            state.invoiceNumber = action.payload
        }),
        clientName: create.reducer((state, action: PayloadAction<string>) => {
            state.clientName = action.payload
        }),
        clientEmail: create.reducer((state, action: PayloadAction<string>) => {
            state.clientEmail = action.payload
        }),
        subject: create.reducer((state, action: PayloadAction<string>) => {
            state.subject = action.payload
        }),
        dueDate: create.reducer((state, action: PayloadAction<string>) => {
            state.dueDate = action.payload
        }),
        currency: create.reducer((state, action: PayloadAction<Currency>) => {
            state.currency = action.payload
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
        selectInvoiceNumber: (invoice) => invoice.invoiceNumber,
        selectClientName: (invoice) => invoice.clientName,
        selectClientEmail: (invoice) => invoice.clientEmail,
        selectSubject: (invoice) => invoice.subject,
        selectDueDate: (invoice) => invoice.dueDate,
        selectCurrency: (invoice) => invoice.currency,
        selectTax: (invoice) => invoice.tax,
        selectDiscount: (invoice) => invoice.discount,
        selectNotes: (invoice) => invoice.notes,
        selectItems: (invoice) => invoice.items,
    },
});

// Action creators are generated for each case reducer function.
export const {
    invoiceNumber,
    clientName,
    clientEmail,
    subject,
    dueDate,
    currency,
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
    selectInvoiceNumber,
    selectClientName,
    selectClientEmail,
    selectSubject,
    selectDueDate,
    selectCurrency,
    selectTax,
    selectDiscount,
    selectNotes,
    selectItems
} = invoicingSlice.selectors;
