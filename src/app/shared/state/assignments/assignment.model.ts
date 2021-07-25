import {
  FetchPolicy,
  Chapter,
  FetchParams,
  startingFetchParams,
} from '../../common/models';

export const emptyChapterFormRecord: Chapter = {
  id: null,
  title: null,
  instructions: null,
  course: null,
};
export interface ChapterStateModel {
  assignments: Chapter[];
  lastPage: number;
  assignmentsSubscribed: boolean;
  fetchPolicy: FetchPolicy;
  fetchParamObjects: FetchParams[];
  assignmentFormId: number;
  assignmentFormRecord: Chapter;
  isFetching: boolean;
  errorFetching: boolean;
  formSubmitting: boolean;
  errorSubmitting: boolean;
}

export const defaultChapterState: ChapterStateModel = {
  assignments: [],
  lastPage: null,
  assignmentsSubscribed: false,
  fetchPolicy: null,
  fetchParamObjects: [],
  assignmentFormId: null,
  assignmentFormRecord: emptyChapterFormRecord,
  isFetching: false,
  errorFetching: false,
  formSubmitting: false,
  errorSubmitting: false,
};

export const ChapterFormCloseURL =
  'dashboard?adminSection=Institutions&tab=Chapters';
