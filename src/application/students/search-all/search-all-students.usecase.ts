import { BaseUseCase, UseCase } from '@application/shared';
import { StudentResponse } from '@application/students';
import { StudentRepository } from '@domain/students';

import { SearchAllStudentsRequest } from './search-all-students.request';

@UseCase()
class SearchAllStudentsUseCase extends BaseUseCase<SearchAllStudentsRequest, StudentResponse[]> {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    super();
    this.studentRepository = studentRepository;
  }

  public async performOperation(): Promise<StudentResponse[]> {
    const students = await this.studentRepository.findAll();
    return students.map(StudentResponse.fromDomainModel);
  }
}

export { SearchAllStudentsUseCase };
