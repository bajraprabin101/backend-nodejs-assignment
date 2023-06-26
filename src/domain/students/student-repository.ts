import { Student } from './student';

abstract class StudentRepository {
  public abstract findAll(): Promise<Student[]>;

  public abstract create(student: Student): Promise<Student>;
}

export { StudentRepository };
