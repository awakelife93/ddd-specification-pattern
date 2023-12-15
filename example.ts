import Order from "./domain/order/Order";
import {
  OrderAmountConsistencySpecification,
  OrderQuantityMustBeGreaterZeroSpecification,
} from "./domain/order/Specification";
import Product from "./domain/product/Product";
import {
  ProductDiscountWithinLimitSpecification,
  ProductNameIsNotBlankSpecification,
  ProductPriceMustBeGreaterZeroSpecification,
} from "./domain/product/Specification";

const currentProduct = new Product("book", 1000, 0);
const currentOrder = new Order(currentProduct, 1, 1000);
const wrongProduct = new Product("book", 0, 0);
const wrongOrder = new Order(wrongProduct, 0, 0);

const productPriceMustBeGreaterZeroSpecification =
  new ProductPriceMustBeGreaterZeroSpecification();
const productNameIsNotBlankSpecification =
  new ProductNameIsNotBlankSpecification();
const productDiscountWithinLimitSpecification =
  new ProductDiscountWithinLimitSpecification();

const orderAmountConsistencySpecification =
  new OrderAmountConsistencySpecification();
const orderQuantityMustBeGreaterZeroSpecification =
  new OrderQuantityMustBeGreaterZeroSpecification();

const productAndSpecification = productPriceMustBeGreaterZeroSpecification
  .and(productNameIsNotBlankSpecification)
  .and(productDiscountWithinLimitSpecification);

const orderAndSpecification = orderAmountConsistencySpecification.and(
  orderQuantityMustBeGreaterZeroSpecification
);

// true
const currentProductOutput =
  productAndSpecification.isSatisfiedBy(currentProduct);
console.log(`currentProductOutput = ${currentProductOutput}`);

// true
const currentOrderOutput = orderAndSpecification.isSatisfiedBy(currentOrder);
console.log(`currentOrderOutput = ${currentOrderOutput}`);

// false
const wrongProductOutput = productAndSpecification.isSatisfiedBy(wrongProduct);
console.log(`wrongProductOutput = ${wrongProductOutput}`);

// false
const wrongOrderOutput = orderAndSpecification.isSatisfiedBy(wrongOrder);
console.log(`wrongOrderOutput = ${wrongOrderOutput}`);
