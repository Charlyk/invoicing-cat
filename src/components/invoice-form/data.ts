import type {InvoiceData} from './types'

export const data: InvoiceData = {
    items_subtotal_price: 597,
    total_discount: 40,
    total_price: 581.65,
    item_count: 2,
    currency: 'USD',
    items: [
        {
            id: '1',
            price: 39.99,
            title: 'Ferragamo bag',
            quantity: 3,
            tax: 0
        },
        {
            id: '2',
            price: 39.99,
            title: 'Bamboo Tan',
            quantity: 3,
            tax: 10
        },
    ],
}
