import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptions = createSelector(selectInscriptionState, (state) => state.data)
export const selectStudentOptions = createSelector(selectInscriptionState, (state) => state.studentOptions)
export const selectCourseOptions = createSelector(selectInscriptionState, (state) => state.courseOptions)