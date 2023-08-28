import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { InscriptionWithCourseAndStudent } from '../models';
import { environment } from 'src/environments/environment';


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getInscriptionsFromDB().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions,
    private httpClient: HttpClient) {}

    private getInscriptionsFromDB(): Observable<InscriptionWithCourseAndStudent[]> {
      return this.httpClient.get<InscriptionWithCourseAndStudent[]>(environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course')
    }
}
