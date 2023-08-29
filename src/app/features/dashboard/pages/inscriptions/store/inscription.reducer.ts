import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { InscriptionWithCourseAndStudent } from '../models';
import { Student } from '../../students/models/modelstudents';
import { Course } from '../../courses/models';

export const inscriptionFeatureKey = 'inscription';

export interface State {

data: InscriptionWithCourseAndStudent[];
loading: boolean;
error: unknown;
studentOptions: Student[],
courseOptions: Course[]
}

export const initialState: State = {
 data: [],
 loading: false,
 error: null,
 studentOptions: [],
courseOptions: []
};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
  return {
    ...state,
    data: action.data,
    loading: false
  }}),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state, 
      error: action.error,
      loading: false
    }
  }),

//Student Options

on(InscriptionActions.loadStudentOptions, (state) => state),
on(InscriptionActions.loadStudentOptionsSuccess, (state, action) => {
  return {
    ...state, 
    studentOptions: action.data
  }
}),
on(InscriptionActions.loadStudentOptionsFailure, (state, action) => {
  return {
    ...state, 
    error: action.error,
    loading: false
  }
}),

//Course Options


on(InscriptionActions.loadCourseOptions, (state) => state),
on(InscriptionActions.loadCourseOptionsSuccess, (state, action) => {
  return {
    ...state, 
    courseOptions: action.data
  }
}),
on(InscriptionActions.loadCourseOptionsFailure, (state, action) => {
  return {
    ...state, 
    error: action.error,
    loading: false
  }
}),


);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

