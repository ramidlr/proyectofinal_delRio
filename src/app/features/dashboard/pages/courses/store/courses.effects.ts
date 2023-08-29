import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Course, CreateCourseData } from '../models';
import { environment } from 'src/environments/environment';

@Injectable()
export class CoursesEffects {


  loadCoursess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.loadCourses),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => this.getCoursesFromDB().pipe(
        map(data => CoursesActions.loadCourseSuccess({ data })),
        catchError(error => of(CoursesActions.loadCourseFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.createCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createCourse(action.payload).pipe(
          map(data => CoursesActions.createCourseSuccess({ data })),
          catchError(error => of(CoursesActions.createCourseFailure({ error }))))
      )
    );
  });


  createCourseSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.createCourseSuccess),
      map(() => this.store.dispatch(CoursesActions.loadCourses()))

    );
  }, { dispatch: false });

  constructor(private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store) { }



  private getCoursesFromDB(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
  }

  private createCourse(payload: CreateCourseData): Observable<Course> {
    return this.httpClient.post<Course>(environment.baseApiUrl + '/courses', payload)
  }
}

