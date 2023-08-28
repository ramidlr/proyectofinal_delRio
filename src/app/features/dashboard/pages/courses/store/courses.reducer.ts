import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models';
import { COURSES_MOCK } from '../mocks';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[]
}

export const initialState: State = {
  courses: []
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => {
    return {
      courses: COURSES_MOCK
    }

  }),

);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

