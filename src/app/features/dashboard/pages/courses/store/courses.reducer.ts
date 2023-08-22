import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCoursess, state => state),

);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

