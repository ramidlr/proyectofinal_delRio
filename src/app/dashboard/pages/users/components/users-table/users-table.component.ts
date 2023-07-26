import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/model';

export interface UserElement {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: string;
  password: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'email',
    'course',
    'edit',
    'delete',
  ];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();
}
