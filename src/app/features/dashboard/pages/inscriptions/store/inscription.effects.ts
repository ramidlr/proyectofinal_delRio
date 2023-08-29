import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { CreateInscriptionPayload, Inscription, InscriptionWithCourseAndStudent } from '../models';
import { environment } from 'src/environments/environment';
import { StudentService } from '../../students/student.service';
import { Student } from '../../students/models/modelstudents';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


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

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadStudentOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getStudentOptions().pipe(
          map(data => InscriptionActions.loadStudentOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadCourseOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCourseOptions().pipe(
          map(data => InscriptionActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });



  createInscription$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createInscription(action.payload).pipe(
          map(data => InscriptionActions.createInscriptionSuccess({ data })),
          catchError(error => of(InscriptionActions.createInscriptionFailure({ error }))))
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
      
    );
  }, {dispatch:false});


  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store
    ) {}

    private getInscriptionsFromDB(): Observable<InscriptionWithCourseAndStudent[]> {
      return this.httpClient.get<InscriptionWithCourseAndStudent[]>(environment.baseApiUrl + '/inscriptions?_expand=student&_expand=course')
    }

    private getStudentOptions(): Observable<Student[]> {
      return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
    }

    private getCourseOptions(): Observable<Course[]> {
      return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
    }

    private createInscription(payload: CreateInscriptionPayload): Observable<Inscription> {
      return this.httpClient.post<Inscription>(environment.baseApiUrl + '/inscriptions', payload)
    }


}
