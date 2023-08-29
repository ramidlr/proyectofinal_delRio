import { ErrorHandler, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CoursesActions } from './courses.actions';
import { HttpClient } from '@angular/common/http';
import { Store, emptyProps } from '@ngrx/store';
import { CreateCourseData } from '../models';
import { environment } from 'src/environments/environment';
import { UpdateCourseData, Course } from '../models/index';

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




  editCourse$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CoursesActions.editCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.editCourse(action.payload).pipe(
          map(data => CoursesActions.editCourseSuccess({ data })),
          catchError(error => of(CoursesActions.editCourseFailure({ error }))))
      )
    );
  });

  // editCourseSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(

  //     ofType(CoursesActions.editCourseSuccess),

  //   );
  // }, { dispatch: false });



  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.deleteCourse(action.payload.id).pipe(
          map(data => CoursesActions.deleteCourseSuccess({ data: action.payload })),
          catchError(error => of(CoursesActions.deleteCourseFailure({ error }))))
      )
    );
  });

  deleteCourseSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourseSuccess),
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

  private editCourse(payload: UpdateCourseData): Observable<UpdateCourseData> {
    return this.httpClient.put(environment.baseApiUrl + '/courses/' + payload.id, payload)
  }

  private deleteCourse(id: number | undefined): Observable<any> {
    if (id === undefined) { throw Error };
    return this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
  }

}

