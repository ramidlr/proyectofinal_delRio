import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';

export const inscriptionFeatureKey = 'inscription';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(InscriptionActions.loadInscriptions, state => state),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => state),
  on(InscriptionActions.loadInscriptionsFailure, (state, action) => state),
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

