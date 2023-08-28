import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/modelusers';

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
  displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'email',
    'course',
    'role',
    'actions',
  ];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();
}
