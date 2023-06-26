import { BaseUseCase, UseCase } from '@application/shared';
import { StudentResponse } from '@application/students';
import { StudentRepository } from '@domain/students';

import { SaveStudentRequest } from './save-student.request';

@UseCase()
class SaveStudentUsecase extends BaseUseCase<SaveStudentRequest, StudentResponse> {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    super();
    this.studentRepository = studentRepository;
  }

  public async performOperation({ student }: SaveStudentRequest): Promise<StudentResponse> {
    await this.studentRepository.create(student);
  }
}

export { SaveStudentUsecase };
