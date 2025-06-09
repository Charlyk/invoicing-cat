// db.ts
import Dexie, { Table } from 'dexie';
import {ProductData} from "@/components/invoice-form/types";

export interface Client {
    id?: number;
    name: string;
    email?: string;
    locale?: string;
    currency?: string;
}

export interface UserSettings {
    id: string; // 'default'
    locale: string;
    currency: string;
    invoiceNumberCounter: number;
}

export interface UserProfile {
    id: string; // 'default'
    name: string;
    email?: string;
    logo?: string; // base64 or URL
}

export type InvoiceStatus = "unknown" | "sent" | "overdue" | "paid";

export interface Invoice {
    id?: number;
    createdAt: string;

    client: Client;

    sender: {
        name: string;
        email?: string;
        logo?: string | null;
    };

    items: ProductData[];

    notes?: string;
    tax?: number;
    discount?: number;

    invoiceNumber: string;
    dueDate: string;
    subject?: string;
    currency: string;

    status?: InvoiceStatus;
}

class InvoicingCatDB extends Dexie {
    clients!: Table<Client>;
    settings!: Table<UserSettings>;
    profile!: Table<UserProfile>;
    invoices!: Table<Invoice>;

    constructor() {
        super('InvoicingCatDB');
        this.version(2).stores({
            clients: '++id, name, email',
            settings: 'id',
            profile: 'id',
            invoices: '++id, clientId, createdAt',
        });
    }
}

export const db = new InvoicingCatDB();
