export interface InvoiceData {
  total_price: number
  total_discount: number
  items_subtotal_price: number
  item_count: number
  currency: string
  items: ProductData[]
}

export interface ProductData {
  id: string
  title: string
  quantity: number
  price: number
}
