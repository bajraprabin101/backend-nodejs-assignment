import { Nullable } from '@domain/shared';
import { DomainEntity } from '@domain/shared/entities/domain-entity';
import { StudentCity } from '@domain/students/student-city';
import { StudentFirstName } from '@domain/students/student-first-name';
import { StudentId } from '@domain/students/student-id';
import { StudentLastName } from '@domain/students/student-last-name';
import { StudentState } from '@domain/students/student-state';
import { StudentUuid } from '@domain/students/student-uuid';
import { StudentZip } from '@domain/students/student-zip';

interface StudentFlattened {
  id: Nullable<number>;
  uuid: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  sent: boolean;
}

class Student extends DomainEntity {
  id: Nullable<StudentId>;

  uuid: StudentUuid;

  firstName: StudentFirstName;

  lastName: StudentLastName;

  city: StudentCity;

  state: StudentState;

  zip: StudentZip;

  sent: boolean;

  constructor(
    id: Nullable<StudentId>,
    uuid: StudentUuid,
    firstName: StudentFirstName,
    lastName: StudentLastName,
    city: StudentCity,
    state: StudentState,
    zip: StudentZip,
    sent: boolean
  ) {
    super();
    this.id = id;
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.sent = sent;
  }

  public static create(
    uuid: StudentUuid,
    firstName: StudentFirstName,
    lastName: StudentLastName,
    city: StudentCity,
    state: StudentState,
    zip: StudentZip,
    sent: boolean
  ): Student {
    return new Student(undefined, uuid, firstName, lastName, city, state, zip, sent);
  }

  public flat(): StudentFlattened {
    return {
      id: this.id?.value,
      uuid: this.uuid.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      city: this.city.value,
      state: this.state.value,
      zip: this.zip.value,
      sent: this.sent
    };
  }
}

export { Student, StudentFlattened };
