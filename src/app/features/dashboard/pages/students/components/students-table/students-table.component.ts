import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/modelstudents';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { Observable } from 'rxjs';

export interface StudentElement {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: string;
  password: string;
}

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  public isAdmin$: Observable<boolean>

  constructor(
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin)}



  displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'email',
    'course',
    'actions',
  ];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();
}
