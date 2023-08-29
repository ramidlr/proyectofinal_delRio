import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course, CreateCourseData, UpdateCourseData } from '../models';
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

    'Edit Course': props<{ payload: UpdateCourseData }>(),
    'Edit Course Success': props<{ data: Partial<Course> }>(),
    'Edit Course Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Course': props<{ payload: UpdateCourseData }>(),
    'Delete Course Success': props<{ data: UpdateCourseData }>(),
    'Delete Course Failure': props<{ error: HttpErrorResponse }>(),
  }
});
