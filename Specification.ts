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

/**
 * @class AndSpecification
 */
class AndSpecification<T> extends CompositeSpecification<T> {
  constructor(
    protected leftCandidate: CompositeSpecification<T>,
    protected rightCandidate: CompositeSpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return (
      this.leftCandidate.isSatisfiedBy(candidate) &&
      this.rightCandidate.isSatisfiedBy(candidate)
    );
  }
}

/**
 * @class OrSpecification
 */
class OrSpecification<T> extends CompositeSpecification<T> {
  constructor(
    protected leftCandidate: CompositeSpecification<T>,
    protected rightCandidate: CompositeSpecification<T>
  ) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return (
      this.leftCandidate.isSatisfiedBy(candidate) ||
      this.rightCandidate.isSatisfiedBy(candidate)
    );
  }
}

/**
 * @class NotSpecification
 */
class NotSpecification<T> extends CompositeSpecification<T> {
  constructor(protected candidate: CompositeSpecification<T>) {
    super();
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.candidate.isSatisfiedBy(candidate);
  }
}

export default CompositeSpecification;
