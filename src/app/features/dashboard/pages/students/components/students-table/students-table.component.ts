import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models/model';

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
