import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/model';

export interface UserElement {
  id: string,
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'edit', 'delete'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();

  @Output()
  editUser = new EventEmitter<User>();
}