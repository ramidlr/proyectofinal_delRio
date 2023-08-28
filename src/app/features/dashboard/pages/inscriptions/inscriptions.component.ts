import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscriptionActions } from './store/inscription.actions';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styles: [],
})
export class InscriptionsComponent implements OnInit {
  displayedColumns = ['id', 'product', 'buyer', 'total'];
  
  constructor(private store: Store) {

    
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions())
  }
}