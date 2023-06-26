import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities/triggered-by';

class SearchAllStudentsRequest extends UseCaseRequest {
  public static create(triggeredBy: TriggeredBy): SearchAllStudentsRequest {
    return new SearchAllStudentsRequest(triggeredBy);
  }

  protected validatePayload(): void {
    // no validation needed
  }
}

export { SearchAllStudentsRequest };
