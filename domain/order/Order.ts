import Product from "../product/Product";

class Order {
  constructor(
    public product: Product,
    public quantity: number,
    public totalPrice: number
  ) {
    this.product = product;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

export default Order;
