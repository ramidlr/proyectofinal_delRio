import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionPayload, Inscription, InscriptionWithCourseAndStudent } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../students/models/modelstudents';
import { Course } from '../../courses/models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithCourseAndStudent[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
    'Load Student Options': emptyProps(),
    'Load Student Options Success': props<{ data: Student[] }>(),
    'Load Student Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Course Options': emptyProps(),
    'Load Course Options Success': props<{ data: Course[] }>(),
    'Load Course Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: Inscription }>(),
    'Create Inscription Failure': props<{ error: HttpErrorResponse }>(),


  }
});
