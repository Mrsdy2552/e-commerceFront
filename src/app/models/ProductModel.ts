export interface Product {
  id: number;
  price: number;
  stock: number;
  category_id: String;
  created_at: String;
  description: String;
  name: String;
}

export interface Product_Item{
    product:Product,
    quantity:number
}
