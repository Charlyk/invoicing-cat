// db.ts
import Dexie, { Table } from 'dexie';

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

export interface Invoice {
    id?: number;
    createdAt: string;

    client: {
        name: string;
        email?: string;
        locale?: string;
        currency?: string;
    };

    sender: {
        name: string;
        email?: string;
        logo?: string;
    };

    items: {
        name: string;
        quantity: number;
        price: number;
    }[];

    notes?: string;
    tax?: number;
    discount?: { label: string; value: string; numeric: number };

    invoiceNumber: string;
    dueDate: string;
    subject?: string;
    currency: string;
}

class InvoicingCatDB extends Dexie {
    clients!: Table<Client>;
    settings!: Table<UserSettings>;
    profile!: Table<UserProfile>;
    invoices!: Table<Invoice>;

    constructor() {
        super('InvoicingCatDB');
        this.version(1).stores({
            clients: '++id, name, email',
            settings: 'id',
            profile: 'id',
            invoices: '++id, clientId, createdAt',
        });
    }
}

export const db = new InvoicingCatDB();
