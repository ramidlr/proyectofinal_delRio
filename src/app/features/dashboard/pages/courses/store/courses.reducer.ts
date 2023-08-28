import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models';
import { COURSES_MOCK } from '../mocks';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[],
  courseDetail: Course | null,
}

export const initialState: State = {
  courses: [],
  courseDetail: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
      courses: COURSES_MOCK
    }
  }),
  on(CoursesActions.loadCourseDetail, (state, actions) => {
    return {
      ...state, 
      courseDetail: COURSES_MOCK.find((c) => c.id == actions.courseId) || null,
    }
  })

);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

