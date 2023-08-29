import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models';
import { COURSES_MOCK } from '../mocks';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[],
  courseDetail: Course | null,
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  courses: [],
  courseDetail: null,
  error: null,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CoursesActions.loadCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      loading: false
    }
  }),
  on(CoursesActions.loadCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(CoursesActions.loadCourseDetail, (state, actions) => {
    return {
      ...state,
      courseDetail: COURSES_MOCK.find((c) => c.id == actions.categoryId) || null,
    }
  }),
  on(CoursesActions.editCourse, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CoursesActions.editCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.map(((u) =>
        u.id === action.data.id ? { ...u, ...action.data } : u
      )),
      loading: false
    }
  }),

  on(CoursesActions.editCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(CoursesActions.deleteCourse, (state, action) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(CoursesActions.deleteCourseSuccess, (state, action) => {
    console.log(action)
    return {
      ...state,
      courses:
        state.courses.filter(((u) =>
          u.id !== action.data.id)),
      loading: false
    }
  }),
  on(CoursesActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  })
);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});