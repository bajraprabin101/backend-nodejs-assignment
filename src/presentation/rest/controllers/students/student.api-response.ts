import { Property } from '@tsed/schema';

class StudentApiResponse {
  @Property()
  readonly uuid: string;

  @Property()
  readonly firstName: string;

  @Property()
  readonly lastName: string;

  @Property()
  readonly city: string;

  @Property()
  readonly state: string;

  @Property()
  readonly zip: string;

  constructor(uuid: string, firstName: string, lastName: string, city: string, state: string, zip: string) {
    this.uuid = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.state = state;
    this.zip = zip;
  }

  public static fromStudentResponse(user: StudentApiResponse): StudentApiResponse {
    return new StudentApiResponse(user.uuid, user.firstName, user.lastName, user.city, user.state, user.zip);
  }
}

export { StudentApiResponse };
