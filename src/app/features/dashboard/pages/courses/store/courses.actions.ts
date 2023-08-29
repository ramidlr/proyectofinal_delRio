import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, CreateCourseData } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Course Detail': props<{ categoryId: number }>(),
    'Load Course Success': props<{ data: Course[] }>(),
    'Load Course Failure': props<{ error: HttpErrorResponse }>(),


    'Create Course': props<{ payload: CreateCourseData }>(),
    'Create Course Success': props<{ data: Course }>(),
    'Create Course Failure': props<{ error: HttpErrorResponse }>(),
  }
});
