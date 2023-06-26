import { StudentModel, StudentsRepository } from '@tsed/prisma';

import { StudentRepository } from '@domain/students';
import { Student } from '@domain/students/student';
import { BasePrismaRepository, RepositoryAction } from '@infrastructure/shared/persistence/base-prisma-repository';
import { Repository } from '@infrastructure/shared/persistence/repository.decorator';

import { StudentMapper } from './student.mapper';

@Repository(StudentRepository)
class PrismaStudentRepository extends BasePrismaRepository<StudentModel> implements StudentRepository {
  private studentsRepository: StudentsRepository;

  constructor(studentsRepository: StudentsRepository) {
    super();
    this.studentsRepository = studentsRepository;
  }

  public async findAll(): Promise<Student[]> {
    const students = await this.studentsRepository.findMany({
      where: { sent: false }
    });

    return students.map(StudentMapper.toDomainModel);
  }

  public async create(student: Student): Promise<Student> {
    const createdStudent = await this.studentsRepository.create({
      data: this.getAuditablePersitenceModel(RepositoryAction.CREATE, StudentMapper.toPersistenceModel(student))
    });
    return StudentMapper.toDomainModel(createdStudent);
  }
}

export { PrismaStudentRepository };
