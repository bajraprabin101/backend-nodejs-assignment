import { StudentModel } from '@tsed/prisma';

import {
  Student,
  StudentCity,
  StudentFirstName,
  StudentId,
  StudentLastName,
  StudentState,
  StudentUuid,
  StudentZip
} from '@domain/students';

class StudentMapper {
  public static toDomainModel(studentPersistenceModel: StudentModel): Student {
    return new Student(
      new StudentId(studentPersistenceModel.id),
      new StudentUuid(studentPersistenceModel.uuid),
      new StudentFirstName(studentPersistenceModel.firstName),
      new StudentLastName(studentPersistenceModel.lastName),
      new StudentCity(studentPersistenceModel.city),
      new StudentState(studentPersistenceModel.state),
      new StudentZip(studentPersistenceModel.zip),
      studentPersistenceModel.sent
    );
  }

  public static toPersistenceModel(student: Student): StudentModel {
    const studentPersistenceModel = new StudentModel();
    if (student.id != null) {
      studentPersistenceModel.id = student.id.value;
    }
    studentPersistenceModel.uuid = student.uuid.value;
    studentPersistenceModel.firstName = student.firstName.value;
    studentPersistenceModel.lastName = student.lastName.value;
    studentPersistenceModel.city = student.city.value;
    studentPersistenceModel.state = student.state.value;
    studentPersistenceModel.zip = student.zip.value;
    studentPersistenceModel.sent = student.sent;
    return studentPersistenceModel;
  }
}

export { StudentMapper };
