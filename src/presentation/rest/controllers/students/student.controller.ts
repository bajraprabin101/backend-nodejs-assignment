import {BodyParams, Context, Get} from '@tsed/common';
import { Description, JsonRequestBody, Post, Returns, Status, Summary, Tags, Title } from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';

import { SaveStudentRequest, SaveStudentUsecase } from '@application/students/save';
import { SearchAllStudentsRequest, SearchAllStudentsUseCase } from '@application/students/search-all';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';
import { UserRoles } from '@domain/users';
import { AppConfig } from '@presentation/rest/config';
import { RestController } from '@presentation/rest/shared/rest-controller.decorator';
import { WithAuth } from '@presentation/rest/shared/with-auth.decorator';

import { StudentApiResponse } from './student.api-response';

@RestController('/students')
@Tags({ name: 'Student', description: 'Student management' })
class StudentController {
  private saveStudentUsecase: SaveStudentUsecase;

  private searchAllStudentsUseCase: SearchAllStudentsUseCase;

  constructor(findStudentUseCase: SaveStudentUsecase, searchAllStudentsUseCase: SearchAllStudentsUseCase) {
    this.saveStudentUsecase = findStudentUseCase;
    this.searchAllStudentsUseCase = searchAllStudentsUseCase;
  }

  @Get()
  @WithAuth({ roles: [UserRoles.ADMIN] })
  @Title('Get all students')
  @Summary('Obtain all students')
  @Description('Endpoint to obtain all students')
  @Returns(StatusCodes.OK, Array).Of(StudentApiResponse)
  @Status(StatusCodes.OK, Array).Of(StudentApiResponse)
  public async searchAllStudents(
    @Context(AppConfig.TRIGGERED_BY_CONTEXT_KEY) triggeredBy: TriggeredBy
  ): Promise<StudentApiResponse[]> {
    const studentResponses = await this.searchAllStudentsUseCase.execute(SearchAllStudentsRequest.create(triggeredBy));
    return studentResponses.map(StudentApiResponse.fromStudentResponse);
  }

  @Post('')
  @WithAuth({ roles: [UserRoles.ADMIN] })
  @Title('Post student')
  @Summary('Save student')
  @Description('Endpoint to save a student')
  @Returns(StatusCodes.OK)
  @Status(StatusCodes.OK)
  public async saveStudent(
    @Context(AppConfig.TRIGGERED_BY_CONTEXT_KEY) triggeredBy: TriggeredBy,
    @BodyParams student: SaveStudentRequest
  ): Promise<StudentApiResponse> {
    await this.saveStudentUsecase.execute(SaveStudentRequest.create(student, triggeredBy));
  }
}

export { StudentController };
