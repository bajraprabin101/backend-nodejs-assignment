import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { InvalidParameterException } from '@domain/shared/exceptions';

class SaveStudentRequest extends UseCaseRequest {
  readonly firstName: string;

  readonly lastName: string;

  readonly city: string;

  readonly state: string;

  readonly zip: string;

  constructor(triggeredBy: TriggeredBy, student: SaveStudentRequest) {
    super(triggeredBy);
    this.firstName = student.firstName;
    this.lastName = student.firstName;
    this.city = student.city;
    this.state = student.state;
    this.zip = student.zip;
  }

  public static create(triggeredBy: TriggeredBy, student: SaveStudentRequest): SaveStudentRequest {
    return new SaveStudentRequest(triggeredBy, student);
  }

  protected validatePayload(): void {
    if (
      this.firstName == null ||
      this.lastName == null ||
      this.city == null ||
      this.state == null ||
      this.zip == null
    ) {
      throw new InvalidParameterException('Invalid save request');
    }
  }
}

export { SaveStudentRequest };
