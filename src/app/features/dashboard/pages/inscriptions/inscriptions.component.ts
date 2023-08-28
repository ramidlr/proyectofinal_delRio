import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionActions } from './store/inscription.actions';
import { InscriptionWithCourseAndStudent } from './models';
import { selectInscriptions } from './store/inscription.selectors';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id inscription', 'alumno', 'id alumno', 'curso', 'precio'];
  inscriptions$: Observable<InscriptionWithCourseAndStudent[]>

  constructor(private store: Store) {
    this.inscriptions$ =  this.store.select(selectInscriptions)

    
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }
}