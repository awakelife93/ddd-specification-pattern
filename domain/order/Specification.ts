import CompositeSpecification from "../../Specification";
import Order from "./Order";

/**
 * @class OrderAmountConsistencySpecification
 * @description
 * The order amount cannot exceed or be less than the total sum of the product price and discount amount.
 */
class OrderAmountConsistencySpecification extends CompositeSpecification<Order> {
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
  OrderAmountConsistencySpecification,
  OrderQuantityMustBeGreaterZeroSpecification,
};
