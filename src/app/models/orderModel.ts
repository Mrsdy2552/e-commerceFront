export interface Order {
  total: number;
  customer_id: number;
  status: String;
}
export interface OrderItem {
  quantity: number;
  price: number;
  product_id: number;
  order_id: number;
}
export interface OrderResponse {
  total: number;
  customer_id: number;
  status: String;

  id: number;
  orderItems: number;
  order_date: string;
}
