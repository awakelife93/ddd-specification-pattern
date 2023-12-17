import CompositeSpecification from "../../Specification";
import Order from "./Order";

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

export {
  OrderPriceConsistencySpecification,
  OrderQuantityMustBeGreaterZeroSpecification,
};
