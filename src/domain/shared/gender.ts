import { InvalidParameterException } from '@domain/shared/exceptions';
import { EnumValueObject } from '@domain/shared/value-object/enum-value-object';

enum Genders {
  UNDEFINED = 'undefined',
  MALE = 'male',
  FEMALE = 'female'
}

class Gender extends EnumValueObject<Genders> {
  constructor(value: Genders) {
    super(value, Object.values(Genders));
  }

  public static fromValue(value: string): Gender {
    switch (value) {
      case Genders.UNDEFINED: {
        return new Gender(Genders.UNDEFINED);
      }
      case Genders.MALE: {
        return new Gender(Genders.MALE);
      }
      case Genders.FEMALE: {
        return new Gender(Genders.FEMALE);
      }
      default: {
        throw new InvalidParameterException(`The gender ${value} is invalid`);
      }
    }
  }

  protected throwErrorForInvalidValue(value: Genders): void {
    throw new InvalidParameterException(`The gender ${value} is invalid`);
  }
}

export { Gender, Genders };
