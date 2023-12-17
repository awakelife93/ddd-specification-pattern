### Example DDD + Specification Design Pattern

This project is based on the DDD + Specification pattern.\
Add as many comparison logics as necessary for various logics or domains at the abstract level.

### [Demo](example.ts)

The example only uses **AND logic**, but **OR** and **NOT** can also be used if necessary.

- npm i or npm install
- npm run example

```typescript
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

const orderPriceConsistencySpecification =
  new OrderPriceConsistencySpecification();
const orderQuantityMustBeGreaterZeroSpecification =
  new OrderQuantityMustBeGreaterZeroSpecification();

const productAndSpecification = productPriceMustBeGreaterZeroSpecification
  .and(productNameIsNotBlankSpecification)
  .and(productDiscountWithinLimitSpecification);

const orderAndSpecification = orderPriceConsistencySpecification.and(
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
```

### [Specification](Specification.ts)

This project is composed of and, or, and not.

```typescript
interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

abstract class CompositeSpecification<T> implements Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;

  and(specification: CompositeSpecification<T>): CompositeSpecification<T> {
    return new AndSpecification<T>(this, specification);
  }

  or(specification: CompositeSpecification<T>): CompositeSpecification<T> {
    return new OrSpecification<T>(this, specification);
  }

  not(): NotSpecification<T> {
    return new NotSpecification<T>(this);
  }
}
```

### Example Domain & Specification

- [Order](domain/order/Order.ts)
  - OrderPriceConsistencySpecification
  - OrderQuantityMustBeGreaterZeroSpecification

```typescript
/**
 * @class OrderPriceConsistencySpecification
 * @description
 * The order price cannot exceed or be less than the total sum of the product price and discount price.
 */
class OrderPriceConsistencySpecification extends CompositeSpecification<Order> {
  isSatisfiedBy(candidate: Order): boolean {
    if (!candidate) return false;

    const totalPrice =
      candidate.quantity *
      (candidate.product.price - candidate.product.discountPrice);

    return candidate.totalPrice === totalPrice;
  }
}

/**
 * @class OrderQuantityMustBeGreaterZeroSpecification
 * @description
 * This specification ensures that the order quantity must be greater than zero.
 */
class OrderQuantityMustBeGreaterZeroSpecification extends CompositeSpecification<Order> {
  isSatisfiedBy(candidate: Order): boolean {
    if (!candidate) return false;

    return candidate.quantity > 0;
  }
}
```

- [Product](domain/product/Product.ts)
  - ProductPriceMustBeGreaterZeroSpecification
  - ProductNameIsNotBlankSpecification
  - ProductDiscountWithinLimitSpecification

```typescript
/**
 * @class ProductPriceMustBeGreaterZeroSpecification
 * @description
 * The price of the product must always be greater than 0.
 */
class ProductPriceMustBeGreaterZeroSpecification extends CompositeSpecification<Product> {
  isSatisfiedBy(candidate: Product): boolean {
    if (!candidate) return false;

    return candidate.price > 0;
  }
}

/**
 * @class ProductNameIsNotBlankSpecification
 * @description
 * The product name cannot be blank.
 */
class ProductNameIsNotBlankSpecification extends CompositeSpecification<Product> {
  isSatisfiedBy(candidate: Product): boolean {
    if (!candidate) return false;

    return candidate.name.length > 0;
  }
}

/**
 * @class ProductDiscountWithinLimitSpecification
 * @description
 * The discounted price of a product cannot be greater than the normal price.
 */
class ProductDiscountWithinLimitSpecification extends CompositeSpecification<Product> {
  isSatisfiedBy(candidate: Product): boolean {
    if (!candidate) return false;

    return candidate.discountPrice < candidate.price;
  }
}
```

### Author

Hyunwoo Park
