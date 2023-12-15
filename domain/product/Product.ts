class Product {
  constructor(
    public name: string,
    public price: number,
    public discountPrice: number
  ) {
    this.name = name;
    this.price = price;
    this.discountPrice = discountPrice;
  }
}

export default Product;
