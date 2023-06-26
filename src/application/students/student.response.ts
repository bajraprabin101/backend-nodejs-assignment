import { Student } from '@domain/students';

class StudentResponse {
  readonly uuid: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly city: string;

  readonly state: string;

  readonly zip: string;

  constructor(uuid: string, firstName: string, lastName: string, city: string, state: string, zip: string) {
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }

  public static fromDomainModel(student: Student): StudentResponse {
    return new StudentResponse(
      student.uuid.value,
      student.firstName.value,
      student.lastName.value,
      student.city.value,
      student.state.value,
      student.zip.value
    );
  }
}

export { StudentResponse };
