import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/modelusers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

export interface UserElement {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: string;
  role: 'admin' | 'user';
  password: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {

  public isAdmin$: Observable<boolean>


  displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'email',
    'course',
    'role',
    'actions',
  ];

  constructor(
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin)}

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();
}
