import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { InscriptionWithCourseAndStudent } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: InscriptionWithCourseAndStudent[] }>(),
    'Load Inscriptions Failure': props<{ error: HttpErrorResponse }>(),
  }
});
