import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionWithCourseAndStudent } from './models';
import { selectInscriptions } from './store/inscription.selectors';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id inscription', 'alumno', 'id alumno', 'curso', 'precio'];
  inscriptions$: Observable<InscriptionWithCourseAndStudent[]>

  constructor(private store: Store,
    private matDialog: MatDialog) {
    this.inscriptions$ = this.store.select(selectInscriptions)
  }

  onAdd(): void {
    this.matDialog.open(InscriptionDialogComponent)
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }
}