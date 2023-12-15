import CompositeSpecification from "../../Specification";
import Product from "./Product";

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
 * The discounted amount of a product cannot be greater than the normal amount.
 */
class ProductDiscountWithinLimitSpecification extends CompositeSpecification<Product> {
  isSatisfiedBy(candidate: Product): boolean {
    if (!candidate) return false;

    return candidate.discountPrice < candidate.price;
  }
}

export {
  ProductPriceMustBeGreaterZeroSpecification,
  ProductNameIsNotBlankSpecification,
  ProductDiscountWithinLimitSpecification,
};
